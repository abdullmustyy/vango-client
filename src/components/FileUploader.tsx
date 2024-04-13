import Dropzone from "react-dropzone";

const FileUploader = () => {
  return (
    <Dropzone
      maxFiles={1}
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".svg"] }}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      onDropAccepted={(acceptedFiles) => console.log(acceptedFiles)}
      onDropRejected={(rejectedFiles) => console.log(rejectedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileUploader;
