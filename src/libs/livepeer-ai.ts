"use server";

// requires no token
export async function textToImage(prompt: string, config: Record<any, any>) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/text-to-image`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          configOption: config ? config : {},
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Backend AI fetch error: ", error);
    return {
      success: false,
      message: `text to image ai failed: ${error as any}.message`,
    };
  }
}

export async function imageToVideo(
  image_url: string,
  config: Record<any, any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/image-to-video`,
      {
        method: "POST",
        body: JSON.stringify({
          image_url: image_url,
          configOption: config,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Backend AI fetch error: ", error);
    return {
      success: false,
      message: `image to video ai failed: ${error as any}.message`,
    };
  }
}

export async function imageToImage(
  prompt: string,
  image_url: string,
  config: Record<any, any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/image-to-image`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt,
          image_url,
          configOption: config,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Backend AI fetch error: ", error);
    return {
      success: false,
      message: `image to video ai failed: ${error as any}.message`,
    };
  }
}

export async function imageUpscale(
  prompt: string,
  image_url: string,
  config: Record<any, any>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/image-upscale`,
      {
        method: "POST",
        body: JSON.stringify({
          prompt,
          image_url,
          configOption: config,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Backend AI fetch error: ", error);
    return {
      success: false,
      message: `image upscale ai failed: ${error as any}.message`,
    };
  }
}

export type VisualType = "image" | "video";

export interface ImageRequest {
  episode: number;
  scene: number;
  act: number;
  image_url: string;
  type: VisualType;
}

export interface VideoRequest {
  video_url: string;
  type: VisualType;
}

export async function saveVisuals(
    storyId: string,
    options: ImageRequest | VideoRequest
) {
    let req: ImageRequest | VideoRequest | undefined;
  try {

    if (!options.type || !["image", "video"].includes(options.type)) {
      throw new Error("Invalid type. Type must be either 'image' or 'video'.");
    }
    if (options.type === "image") {
      req = {
        episode: (options as ImageRequest).episode,
        scene: (options as ImageRequest).scene,
        act: (options as ImageRequest).act ,
        image_url: (options as ImageRequest).image_url,
        type: (options as ImageRequest).type, 
      };
    }
    if (options.type === "video") {
      req = {
        video_url: (options as VideoRequest).video_url,
        type: (options as VideoRequest).type,
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/story/${storyId}`,
      {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const data = await response.json();
      console.log("visuals data: ", data)
    return data;
  } catch (error) {
    console.error("Backend AI fetch error: ", error);
    return {
      success: false,
      message: `saving ai visual failed: ${(error as any).message}`,
    };
  }
}
