"use server";

import * as fal from "@fal-ai/serverless-client";
const fal_key = process.env.FAL_KEY ?? process.env.FAL ?? "";

fal.config({
  credentials: fal_key, // or a function that returns a string
});

type Image = {
  url: string;
  file_name: string;
  file_size: number;
};

type Result = {
  images: Image[];
};

type UpscaleResult = {
  image: Image;
};

// This function makes a request to the FAL api and gets an image.
export async function generateImageFal(
  prompt: string,
  image_size: string,
  model:
    | "fast-turbo-diffusion"
    | "hyper-sdxl"
    | "fast-sdxl" = "fast-turbo-diffusion",
  negativePrompt: string = "cartoon, illustration, animation, face, male, female, ugly"
) {
  const result: Result = await fal.run(`fal-ai/${model}`, {
    input: {
      prompt: prompt,
      negativePrompt: negativePrompt,
      image_size: image_size,
      sync_mode: true,
    },
  });
  return result.images[0].url;
}

const seed = Math.floor(Math.random() * 100000);

// This function makes a request to the FAL api and gets an image.
export async function generateImageToImageFal(
  prompt: string,
  image_url: string,
  randomSeed: boolean = false
) {
  const generationSeed = randomSeed ? Math.floor(Math.random() * 100000) : seed;
  const result: Result = await fal.run(`fal-ai/lcm-sd15-i2i`, {
    input: {
      prompt: prompt,
      image_url: image_url,
      strength: 0.99,
      sync_mode: true,
      seed: generationSeed,
    },
  });
  return result.images[0].url;
}

export type UpscaleOptions = {
  prompt?: string;
  scale?: number;
  creativity?: number;
  detail?: number;
  shape_preservation?: number;
  num_inference_steps?: number;
};

// This function makes a request to the FAL api and gets an image.
export async function creativeUpscale(
  image_url: string,
  options: UpscaleOptions = {
    scale: 2,
    creativity: 0.5,
    detail: 1,
    shape_preservation: 0.25,
    num_inference_steps: 10,
  }
) {
  const result: UpscaleResult = await fal.run(`fal-ai/creative-upscaler`, {
    input: {
      image_url: image_url,
      ...options,
    },
  });
  return result.image.url;
}
