import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { pipeline } from "@huggingface/transformers";
import { useDropzone } from "react-dropzone";

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setCaption(null);
    try {
      const captioner = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning"
      );

      const output = await captioner(image);

      setCaption(output[0].generated_text);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Image-to-Text (Captioning)</Card.Title>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one.</p>
          </div>

          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !image}
            className="mt-3"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Generate Caption"
            )}
          </Button>
        </Card.Body>
      </Card>

      {caption && (
        <div className="mt-3">
          <h4>Generated Caption:</h4>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
