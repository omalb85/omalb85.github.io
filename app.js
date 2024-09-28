// Initialize the JSON editor with default mode 'tree'
const container = document.getElementById("jsoneditor");
let options = {
  mode: "tree", // Default mode
};
let editor = new JSONEditor(container, options);

// Handle mode change from dropdown
document.getElementById("modeSelect").addEventListener("change", (event) => {
  const selectedMode = event.target.value;

  // Get the current JSON data to preserve it
  const currentJson = editor.get();

  // Destroy the current editor instance
  editor.destroy();

  // Create a new editor instance with the selected mode
  options = { mode: selectedMode };
  editor = new JSONEditor(container, options);

  // Set the preserved JSON data in the new editor instance
  editor.set(currentJson);
});

// Handle file input change event
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const json = JSON.parse(e.target.result);
        editor.set(json);
        alert("JSON file loaded successfully!");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Failed to load JSON file. Please make sure the file is valid.");
      }
    };

    reader.readAsText(file);
  } else {
    alert("No file selected");
  }
});

// Save button handler
document.getElementById("saveButton").addEventListener("click", () => {
  try {
    const updatedJson = editor.get(); // Get updated JSON data

    // Convert JSON object to string
    const jsonString = JSON.stringify(updatedJson, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = "updated-data.json";

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

    alert("JSON file saved successfully!");
  } catch (error) {
    console.error("Error saving JSON:", error);
    alert("Failed to save JSON");
  }
});
