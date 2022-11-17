

import './Story.css'

import { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';

const Story = ({pic, setPic, flipPage, characterSheet, setCharacterSheet, caveStory, choiceRecord, setChoiceRecord}) => {

    const currentDescriptionRef = useRef();
    const imgRef = useRef();
    const buttonRef = useRef();
    const storyRef = useRef();
    const lastChoiceRef = useRef();

    const [choice1, setChoice1] = useState('story-choice')
    const [choice2, setChoice2] = useState('story-choice')
    const [choice3, setChoice3] = useState('story-choice')



    // changes the choice buttons css class on down click or up click
    const toggleChoiceButtons = (event, button) =>{
        console.log(choiceRecord)
        let newCharacter = {...characterSheet}
        let newChoiceRecord = [...choiceRecord]
        let o = getRandomOutcome('path')
       switch (button) {
        case 1:
            if (choice1 === 'story-choice') {
                setChoice1('story-choice-clicked')
            } else  {
                if (!newCharacter.path) {
                    newChoiceRecord.unshift(newCharacter.path + 'c.1.story')
                    newChoiceRecord.unshift(newCharacter.path + 'c.1.o.' + o + '.description')
                } else {
                    newChoiceRecord.unshift(newCharacter.path + '.c.1.story')
                    newChoiceRecord.unshift(newCharacter.path + '.c.1.o.' + o + '.description')
                }
                if (!checkImg(getPath('c.1.o.' + o + '.path'))) {
                    setPic(pic + 1)
                }
                setChoiceRecord(newChoiceRecord)
                newCharacter.path = getPath('c.1.o.' + o + '.path')
                setCharacterSheet(newCharacter)
                setChoice1('story-choice')
                
            } 
            break;
        case 2: 
            if (choice2 === 'story-choice') {
                setChoice2('story-choice-clicked')
            } else  {
                if (!newCharacter.path) {
                    newChoiceRecord.unshift(newCharacter.path + 'c.2.story')
                    newChoiceRecord.unshift(newCharacter.path + 'c.2.o.' + o + '.description')
                    
                } else {
                    newChoiceRecord.unshift(newCharacter.path + '.c.2.story')
                    newChoiceRecord.unshift(newCharacter.path + '.c.2.o.' + o + '.description')
                }
                if (!checkImg(getPath('c.2.o.' + o + '.path'))) {
                    setPic(pic + 1)
                }
                setChoiceRecord(newChoiceRecord)
                newCharacter.path = getPath('c.2.o.' + o + '.path')
                setCharacterSheet(newCharacter)
                setChoice2('story-choice')
            }  
            break; 
        case 3:
            if (choice3 === 'story-choice') {
                setChoice3('story-choice-clicked')
            } else  {
                if (!newCharacter.path) {
                    newChoiceRecord.unshift(newCharacter.path + 'c.3.story')
                    newChoiceRecord.unshift(newCharacter.path + 'c.3.o.' + o + '.description')
                } else {
                    newChoiceRecord.unshift(newCharacter.path + '.c.3.story')
                    newChoiceRecord.unshift(newCharacter.path + '.c.3.o.' + o + '.description')
                }
                if (!checkImg(getPath('c.3.o.' + o + '.path'))) {
                    setPic(pic + 1)
                }
                setChoiceRecord(newChoiceRecord)
                newCharacter.path = getPath('c.3.o.' + o + '.path')
                setCharacterSheet(newCharacter)
                setChoice3('story-choice')
            } 
            break;
        default:
            break;
       }
        
    }



    const getRandomOutcome = (path) => {
        return Math.floor(Math.random() * 3 + 1)
    }




    // handles fade in of picture if its changed
    useEffect(() => {

        setTimeout(()=>{
            imgRef.current.animate(
                {
                    opacity: [0, 0.7]
                },
                500
                );
        }, 500)

            imgRef.current.animate(
            {
                opacity: [0, 0]
            },
            500
            );
        }, [pic]);


    // handles fade in of all text and buttons
    useEffect(() => {


        // this was to make the last choice fade first
        
        setTimeout(()=>{
            lastChoiceRef.current.animate(
                {
                    opacity: [0, 1]
                  },
                  500
            )
        }, 500)
        
        lastChoiceRef.current.animate(
            {
                opacity: [0, 0]
              },
              500
        )






        currentDescriptionRef.current.animate(
            {
              opacity: [0, 0]
            },
            500
          );
        setTimeout(()=>{
            currentDescriptionRef.current.animate(
          {
            opacity: [0, 1]
          },
          500
        );
        }, 500)
        




// used to fade in all story history
        // storyRef.current.animate(
        //       {
        //         opacity: [0, 0]
        //       },
        //       2500
        //     );
        //     setTimeout(() => {
        //     storyRef.current.animate(
        //         {
        //             opacity: [0, 1]
        //         },
        //         500
        //         );
        //     }, 2500);





        buttonRef.current.animate(
            {
            opacity: [0, 0]
            },
            1500
        );
        setTimeout(()=>{
            buttonRef.current.animate(
                {
                opacity: [0, 1]
                },
                500
            );
        }, 1500)
        
      }, [choiceRecord]);

      

    // Used to turn string path of object into outcome
    const resolve = (path, obj, separator='.') => {
        var properties = Array.isArray(path) ? path : path.split(separator)
        return properties.reduce((prev, curr) => prev?.[curr], obj)
    }

    // Gets the image for the story
    const getPath = (ending) => {
        if (!characterSheet.path) {
            return resolve(characterSheet.path + ending, caveStory)
        } else {
            return resolve(characterSheet.path + '.' + ending, caveStory)
        } 
    }

    // Used to check if the new path has a different image
    const checkImg = (newPath) => {
        
        if (!newPath) {
            if (resolve('img', caveStory) === getPath('img')) {
                return true
            } else {
                return false
            }
        } else {
            if (resolve(newPath + '.' + 'img', caveStory) === getPath('img')) {
                return true
            } else {
                return false 
            }
        } 
    } 


    // Checks to see if requirements for choices are met and then returns a list of choices
    const getChoices = () => {
        let choicesKeys = Object.keys(getPath('c'))
        let returnChoicesKeys = [];
        choicesKeys.forEach((key, idx)=>{
            if ((!getPath('c')[key].requirement[0] || characterSheet.tags[getPath('c')[key].requirement[0]]) && idx < 3) {
                returnChoicesKeys.push(key)
            }
        })
        return returnChoicesKeys
    }

    // Changes the css class for story
    const getStoryClassName = () =>{
        if (choiceRecord.length >= 4) {
            return 'story-description3'
        } else if (choiceRecord.length >= 3) {
            return 'story-description2'
        } else if (choiceRecord.length >= 1) {
            return 'story-description1'
        }
    } 


    return (
        <div className={"story-content"} >

            <div onClick={() => flipPage(3)} style={{alignText: 'left', width: '100%', alignSelf: 'left', position: 'absolute', zIndex: '1'}} >
                <div   style={{padding: '0px 30px', fontSize:'40px', opacity: '.7'}} ><IonIcon icon={bookOutline} /></div>
            </div>

            <div ref={imgRef} className="story-profile" >
                <img  src={`/assets/${getPath('img')}`} />
            </div>

{/* This was used to show all choice history */}
            {/* <div ref={storyRef} className={getStoryClassName()}  >
                {choiceRecord.map((pastchoice, idx)=>{
                    if (idx > 1) {
                        return <div key={idx} >{resolve(pastchoice, caveStory)}</div>
                    } 
                })}        
            </div> */}


{/* This was to make the last choice appear first and slowly */}
            <div ref={lastChoiceRef} style={{paddingBottom: '5px'}} className='story-description1' >
                <div style={{marginTop: '15px', fontSize: '19px', textAlign: 'center'}} >{choiceRecord.length > 1 ? resolve(choiceRecord[1], caveStory) : null}</div>
                
                </div>

            <div className='story-description-current' >
                <div ref={currentDescriptionRef} >
                    {resolve(choiceRecord[0], caveStory)}
                </div>
            </div>
            

            <div ref={buttonRef} className='story-choices' >

                {getChoices().map((choice,idx)=>{
                    let css;
                    switch (idx) {
                        case 0:
                            css = choice1
                            break;
                        case 1:
                            css = choice2
                            break;
                        case 2:
                            css = choice3
                            break;
                        default:
                            break;
                    }
                    return <div  key={idx} onPointerDown={(event) => toggleChoiceButtons(event, idx + 1) } onPointerUp={(event) => toggleChoiceButtons(event,idx + 1) }  className={css}>
                                <div>{getPath('c')[choice].description}</div>
                            </div>
                })}

            </div>



        </div>


        




    )
 



}

export default Story



 