
//get root styles css
const rootStyles = window.getComputedStyle(document.documentElement)

if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != ''){
  ready()
} else{
  document.getElementById('main-css').addEventListener('load', ready)
}

function ready(){
  const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
  const coverHeight =  parseFloat(coverWidth /  coverAspectRatio)

  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

  FilePond.setOptions({
      // stylePanelAspectRatio: 150 / 100, //look at the views/book.index.ejs height / width 150 / 100 
      // imageResizeTargetWidth: 100, //look on documentary image resize. width
      // imageResizeTargetHeight: 150 // image resize height
      
      //get from css. dont forget to add class book-cover on form_fields book filepond
      stylePanelAspectRatio: 1 / coverAspectRatio, //look at the views/book.index.ejs height / width 150 / 100 
      imageResizeTargetWidth: coverWidth, //look on documentary image resize. width
      imageResizeTargetHeight: coverHeight // image resize height

  })
    
  FilePond.parse(document.body)
    
}

