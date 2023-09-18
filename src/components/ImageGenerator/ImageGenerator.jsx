import React, { useRef, useState } from "react";
import defaultImage from "../Assets/cover.jpg";
import styles from "../../styles/imageGenerator.module.css";

export const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    const response = await fetch(
    //   "https://api.openai.com/v1/images/generations",
     'https://stablediffusionapi.com/api/v3/text2img' ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'api-key':'quickstart-QUdJIGlzIGNvbWluZy4uLi4K' ,
        //   Authorization: "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify(
            
        //     {
        //   prompt: `${inputRef.current.value}`,
        //   n: 1,
        //   size: "512x512",
        // }
        {
            "key": "CI0MJQmYs0IWvfqZautxL94YJbvhtQcrjDjP4RmrZRTYpTGiFMxSn4HKdODY",
            "prompt":  `${inputRef.current.value}`,
            "negative_prompt": null,
            "width": "512",
            "height": "512",
            "samples": "1",
            "num_inference_steps": "20",
            "safety_checker": "no",
            "enhance_prompt": "yes",
            "seed": null,
            "guidance_scale": 7.5,
            "multi_lingual": "no",
            "panorama": "no",
            "self_attention": "no",
            "upscale": "no",
            "embeddings_model": null,
            "webhook": null,
            "track_id": null
          }
        
        ),
      }
    );

    let data = await response.json();
    let data_array = data.output;
    setImageUrl(data_array[0]);
  };

  return (
    <div className={styles.ai_image_generator}>
      <div className={styles.header}>
        AI Image <span> generator</span>
      </div>
      <div className={styles.img_loading}>
        <div className={styles.image}>
          <img
            src={imageUrl === "/" ? defaultImage : imageUrl}
            alt="default"
            width="200px"
            height="200px"
          />
        </div>
      </div>
      <div className={styles.search_box}>
        <input
          type="text"
          ref={inputRef}
          className={styles.search_input}
          placeholder="Describe what you want to see"
        />
        <div
          className={styles.generateBtn}
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
