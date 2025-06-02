// Helper function to construct full image URL for uploaded images
const getImageUrl = (imagePath: string) => {
  if (!imagePath) {
    console.log("No image path provided");
    return null;
  }

  console.log("Processing image path:", imagePath);

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    console.log("Full URL detected:", imagePath);
    return imagePath;
  }

  // For uploaded images, construct the full URL
  const baseUrl = "https://react-bank-project.eapi.joincoded.com"; // Not the best way to do this, but keep it for now.

  // Handle different possible path formats
  let fullUrl;
  if (imagePath.startsWith("/")) {
    // Path starts with slash: /uploads/image.jpg
    fullUrl = `${baseUrl}${imagePath}`;
  } else {
    // Path doesn't start with slash: uploads/image.jpg
    fullUrl = `${baseUrl}/${imagePath}`;
  }

  console.log("Constructed full URL:", fullUrl);
  return fullUrl;
};

export default getImageUrl;
