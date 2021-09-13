FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100, //look at the views/book.index.ejs height / width 150 / 100 
    imageResizeTargetWidth: 100, //look on documentary image resize. width
    imageResizeTargetHeight: 150 // image resize height
})
  
FilePond.parse(document.body)
  