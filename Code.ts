function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function processForm(formObject) {
  var presentation = Slides.Presentations.create({
    title: "title"
  });
  addNewSlidesToPresentation(formObject, presentation.presentationId);
}

function addNewSlidesToPresentation(formObject, presId) {
  // See Presentation.insertSlide(...) to learn how to add a slide using SlidesApp.
  // http://developers.google.com/apps-script/reference/slides/presentation#appendslidelayout

  var requests = [{
    createSlide: {
      insertionIndex: '1',
      slideLayoutReference: {
        predefinedLayout: 'TITLE_AND_TWO_COLUMNS'
      }
    }
  }];

  // If you wish to populate the slide with elements, add element create requests here,
  // using the pageId.


  // Execute the request.
  var createSlideResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presId);
  addTextToSlide(formObject, createSlideResponse.replies[0].createSlide.objectId, presId);
}

function addTextToSlide(formObject, pageId, presId) {
  // Create a new square textbox, using the supplied element ID.
  var elementId = 'MyTextBox_01';
  var pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  var requests = [{
    createShape: {
      objectId: elementId,
      shapeType: 'TEXT_BOX',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: pt350,
          width: pt350
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 350,
          translateY: 100,
          unit: 'PT'
        }
      }
    }
  },

  // Insert text into the box, using the supplied element ID.
  {
    insertText: {
      objectId: elementId,
      insertionIndex: 0,
      text: 'New Box Text Inserted!'
    }
  }];

  // Execute the request.
  var createTextboxWithTextResponse = Slides.Presentations.batchUpdate({
    requests: requests
  }, presId);
  var createShapeResponse = createTextboxWithTextResponse.replies[0].createShape;
  console.log('Created textbox with ID: %s', createShapeResponse.objectId);
}