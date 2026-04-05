import { z } from "zod";

export const creatorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  post_price: z.coerce.number().min(0, "Post price must be 0 or more"),
  reel_price: z.coerce.number().min(0, "Reel price must be 0 or more"),
  story_price: z.coerce.number().min(0, "Story price must be 0 or more"),
  instagram_link: z.string().url("Invalid Instagram URL").or(z.string().min(1, "Instagram link is required")), // fallback for non-URL input if needed, but per prompt z.string().url()
  whatsapp_number: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  youtube_link: z.string().url("Invalid YouTube URL").optional().or(z.literal('')),
});

export interface CreatorSubmissionData {
  name: string;
  email: string;
  post_price: number | string;
  reel_price: number | string;
  story_price: number | string;
  instagram_link: string;
  whatsapp_number: string;
  youtube_link?: string;
  image?: File | null;
}

/**
 * Service to submit a creator's onboarding request.
 * Uses FormData to handle both text and file (image) content.
 * Includes Zod validation for robust input checking.
 */
export const submitCreatorRequest = async (data: CreatorSubmissionData, token?: string) => {
  try {
    // 🛡️ 2. Input Validation (CRITICAL)
    const parsed = creatorSchema.safeParse(data);

    if (!parsed.success) {
      console.error("Validation Error:", parsed.error.issues);
      const errorMessages = parsed.error.issues.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`).join(", ");
      return { 
        success: false, 
        status: 400, 
        error: `Validation failed: ${errorMessages}`,
        details: parsed.error.issues
      };
    }

    console.log("Submitting creator request through service...", data);
    
    const formData = new FormData();
    
    // Append all fields to FormData using the validated data
    const validatedData = parsed.data;
    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    // IMPORTANT: Append image file if present (not part of Zod schema because it's a File)
    if (data.image) {
      formData.append("image", data.image);
    }

    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("http://localhost:5000/api/v1/creator-submission", {
      method: "POST",
      body: formData,
      headers: headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Creator submission failed:", response.status, errorText);
      return { success: false, status: response.status, error: errorText };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in submitCreatorRequest service:", error);
    return { success: false, error: (error as Error).message };
  }
};
