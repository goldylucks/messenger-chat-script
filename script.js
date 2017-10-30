(function() {
  const msgs = []
  document.getElementById('js_1').childNodes.forEach((node, idx) => {
    // check if it's a time node!
    if (node.tagName === 'H4') {
      msgs.push({ author: 'time', content: node.innerText })
      return 
    }

    let msg = { content: [] }
    
    msg.author = node.innerText.split('\n')[0] === 'Adam'
      ? 'adam'
      : 'other'
      
    node.querySelectorAll('.direction_ltr').forEach(node => {

      // voice message
      const voiceMsgNode = node.querySelector('[aria-label="Voice Message"]')
      if (voiceMsgNode) {
        msg.content.push({ type: 'voiceMsg', duration: voiceMsgNode.innerText.trim() })
        return
      }


      // sticker
      const stickerNode = node.querySelector('[data-testid=sticker]')
      if (stickerNode) {
        msg.content.push({ type: 'sticker', backgroundImage: stickerBackgroundImage(stickerNode.style['background-image']) })
        return
      }

      // image
      const imageNode = node.querySelector('[role=presentation]')
      if (imageNode) {
        msg.content.push({ type: 'image', src: imageNode.querySelector('img').src })
        return
      }

      // pure emoticon msg
      const pureEmoticonNode = !node.innerText && node.querySelector('img')
      if (pureEmoticonNode) {
        msg.content.push({ type: 'emoticon', alt: pureEmoticonNode.alt, src: pureEmoticonNode.src })
        return
      }

      // msg with html (**bold** _italics_ ~strike~ <a>)
      const textWithHtml = node.querySelector('._aok span b') || node.querySelector('._aok span i') || node.querySelector('._aok span s') || node.querySelector('._aok span a');
      if (textWithHtml) {
        msg.content.push({ type: 'textWithEmoticon', html: textWithHtml.parentNode.innerHTML })
        return
      }

      // msg with emoticon
      const textWithEmoticonNode = node.querySelector('._aok span span')
      if (textWithEmoticonNode) {
        msg.content.push({ type: 'textWithEmoticon', html: textWithEmoticonNode.innerHTML })
        return
      }

      // pure text
      msg.content.push({ type: 'text', html: node.innerText })
    })
    msgs.push(msg)
  })

  prompt('', JSON.stringify(msgs))

  function stickerBackgroundImage(imageFbUrl) {
    if (imageFbUrl.match(443281065778538)) { return 'url(http://res.cloudinary.com/goldylucks/image/upload/v1504165088/stickers/sticker-crock-magic.png)' }
    if (imageFbUrl.match(126362187548578)) { return 'url(http://res.cloudinary.com/goldylucks/image/upload/v1504164954/stickers/sticker-tounge.png)' }
  }
  
}())
