(function() {
	CKEDITOR.dialog.add("lightbox", function(editor) {
	  var rand = function() {
      var r = "";
      var ch = "abcdefghijklmnopqrstuvwxyz0123456789";
      for(var i=0; i<10; i++)r += ch.charAt(Math.floor(Math.random() * ch.length));
      return r;
    };
	  return {
			title: 'Lightbox',
			minWidth: 550,
			minHeight: 230,
			contents: [
			  {
          id: "tab id",
          label: "tab label",
          title: "tab title",
          elements: [
            {
              type: "text",
              label: editor.lang.lightbox.title,
              id: "advTitle",
              validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.lightbox.title + " field cannot be empty." ),
              setup: function(a) {
                this.setValue(title || "");
              },
              commit: function(a) {
                title = this.getValue() || "";
              }
            },
            {
              type: "text",
              label: editor.lang.lightbox.src,
              id: "advSrc",
              validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.lightbox.src + " field cannot be empty." ),
              setup: function(a) {
                this.setValue(src || "");
              },
              commit: function(a) {
                src = this.getValue() || "";
              }
            }
          ]
			  }
			],
			onShow: function() {
        selectedElement = editor.getSelection().getSelectedElement();
        image = selectedElement.$.querySelector("img");
        src = image.getAttribute("src");
        title = src.split(/[\\/]/g).pop().split('.')[0];
        this.setupContent(title, src);
			},
			onOk: function() {
        // sets src and title
			  this.commitContent();
        var widget = editor.widgets.focused;
        if (widget && widget.name === 'image') {
          widget.setData('link', CKEDITOR.tools.extend({
            'href': src,
            'data-lightbox': title + "-" + rand()
          }, widget.data.link));
          editor.fire('saveSnapshot');
        }
			}
		}
	})
})();
