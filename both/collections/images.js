// Create images filestore
var imageFilesystemStorage = new FS.Store.FileSystem("images");

// Create images collection
Images = new FS.Collection("images", {
    stores: [imageFilesystemStorage]
});


// Create images filestore
var qimageFilesystemStorage = new FS.Store.FileSystem("qimages");

// Create images collection
QImages = new FS.Collection("qimages", {
    stores: [qimageFilesystemStorage]
});
