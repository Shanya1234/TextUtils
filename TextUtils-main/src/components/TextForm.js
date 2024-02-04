import React, {useState ,useEffect} from 'react'
import SpeechRecognition from 'react-speech-recognition';


export default function TextForm(props) {
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = ()=>{ 
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = ()=>{ 
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event)=>{
        setText(event.target.value) 
    }

    // Credits: A
    const handleCopy = () => {
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    // Credits: Coding Wala
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleSpeakClick = () => {
        if (!speaking && text) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
          setSpeaking(true);
        } else {
          speechSynthesis.cancel();
          setSpeaking(false);
        }
      };

      const reverseText = (str) => {
        return str.split('').reverse().join('');
      };
      
      const handleReverseClick = () => {
        const reversed = reverseText(text);
        setText(reversed);
        props.showAlert('Text Reversed!', 'success');
      };

      const handleFindReplace = () => {
        if (findText && replaceText) {
          const regex = new RegExp(findText, 'g');
          if (text.match(regex)) {
            const updatedText = text.replace(regex, replaceText);
            setText(updatedText);
            props.showAlert('Text Replaced!', 'success');
          } else {
            props.showAlert('No occurrences of the "Find" text found in the input.', 'warning');
          }
        } else {
          props.showAlert('Both "Find" and "Replace" fields are required.', 'warning');
        }
      };
      
      const handleFindTextChange = (event) => {
        setFindText(event.target.value);
      };
      
      const handleReplaceTextChange = (event) => {
        setReplaceText(event.target.value);
      };

      const handleSpeechRecognition = () => {
        setSpeaking(true);
        SpeechRecognition.startListening();
      };
      
      const handleSpeechRecognitionEnd = () => {
        setSpeaking(false);
        SpeechRecognition.stopListening();
        console.log('Recognized Text:', props.transcript); // Debugging
        if (props.transcript) {
          setRecognizedText(props.transcript);
          // Append recognized speech to the existing text
          setText((prevText) => prevText + ' ' + props.transcript);
        }
      };
      




      

    const [text, setText] = useState(''); 
    const [speaking, setSpeaking] = useState(false);
    const [translatedText, setTranslatedText] = useState('');
    const [reversedText, setReversedText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [recognizedText, setRecognizedText] = useState('');
    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSpeakClick}>
          {speaking ? 'Stop Speaking' : 'Speak Text'}
        </button>
        <button
        disabled={text.length === 0}
        className="btn btn-primary mx-1 my-1"
        onClick={handleReverseClick}
      >
        Reverse Text
      </button>
      {/* <button
  className="btn btn-primary mx-1 my-1"
  onClick={speaking ? handleSpeechRecognitionEnd : handleSpeechRecognition}
>
  {speaking ? 'Stop Speaking' : 'Start Speaking'}
</button> */}
        
        {/* <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleTranslateToHindi}>
          Translate to Hindi
        </button> */}
        </div>
        <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
      <h2>Find and Replace</h2>
      <input
        type="text"
        placeholder="Find"
        value={findText}
        onChange={handleFindTextChange}
        className="form-control my-2"
        style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}}
      />
      <input
        type="text"
        placeholder="Replace"
        value={replaceText}
        onChange={handleReplaceTextChange}
        className="form-control my-2"
        style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}}
      />
      <button
        disabled={text.length === 0 || findText === '' || replaceText === ''}
        className="btn btn-primary mx-1 my-1"
        onClick={handleFindReplace}
      >
        Find and Replace
      </button>
    </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>
            
        </div>
        </>
    )
}