import './CharacterCreation.css'

import { IonHeader, IonToolbar, IonTitle, IonIcon } from '@ionic/react';

import { useState, useEffect } from 'react';

import { chevronUp, chevronDown } from 'ionicons/icons'




const CharacterCreation = ({flipPage, characterSheet, setCharacterSheet}) => {

    
    const [characterName, setCharacterName] = useState('')
    const [start, setStart] = useState('title-start')


    // changes the start button css class on down click or up click
    const toggleStartClass = (event) =>{
        if (start === 'title-start') {
            setStart('title-start-clicked')
        } else  {
            setStart('title-start')
            // setting state at the same time as page turn stops animation, so setTime is needed.
            setTimeout(()=>{
                let newCharacter = {...characterSheet}
                newCharacter.name = characterName;
                setCharacterSheet(newCharacter)
            }, 1000)
            flipPage(2)
        } 
    }

    // updates character sheet when race or class is selected
    const handleSelection = (event, category) => {
        let newCharacter = {...characterSheet}
        newCharacter[category] = event.target.value
        handleBonus(category, event.target.value)
        setCharacterSheet(newCharacter)
    }

    // adds bonus to character sheet based on race and class
    const handleBonus = (category, selection) => {
        let increment;
        switch (selection) {
            case 'elf':
                increment = 'int'
                break;
            case 'dwarf':
                increment = 'con'
                break;
            case 'gnome':
                increment = 'luc'
                break;
            case 'human':
                increment = 'cha'
                break;
            case 'warrior':
                increment = 'str'
                break;
            case 'wizard':
                increment = 'int'
                break;
            case 'druid':
                increment = 'dex'
                break;
            case 'bard':
                increment = 'cha'
                break;
            default:
                break;
        } 
        let newCharacter = {...characterSheet}
        if (category === 'race') {
            newCharacter.raceBonus.str = 0;
            newCharacter.raceBonus.con = 0;
            newCharacter.raceBonus.dex = 0;
            newCharacter.raceBonus.int = 0;
            newCharacter.raceBonus.cha = 0;
            newCharacter.raceBonus.luc = 0;
            newCharacter.raceBonus[increment] = 1
        } else {
            newCharacter.classBonus.str = 0;
            newCharacter.classBonus.con = 0;
            newCharacter.classBonus.dex = 0;
            newCharacter.classBonus.int = 0;
            newCharacter.classBonus.cha = 0;
            newCharacter.classBonus.luc = 0;
            newCharacter.classBonus[increment] = 1
        }
        setCharacterSheet(newCharacter)
    }

    // updates character name on page turn
    const updateName = (event) => {
        let newCharacterName = ''
        newCharacterName = event.target.value;
        setCharacterName(newCharacterName)
    }


    // increments attribute points on character sheet
    const handleIncrement = (event, attr, direction) => {
        let legal;
        let newCharacter = {...characterSheet};
        if (newCharacter[attr] <= 0 && direction === -1) { return }
        newCharacter[attr] = newCharacter[attr] + direction;
        [legal, newCharacter] = incrementRemainingPointsNormal(attr, direction, newCharacter)
        if (legal) {
            setCharacterSheet(newCharacter)
        } else {
            return
        }
        
    }

    // increments the remaining attribute points 
    const incrementRemainingPointsNormal = (attr, direction, newCharacter) => {
        if (direction === 1) {
            newCharacter.attrRemaining = newCharacter.attrRemaining - 1
        } else {
            newCharacter.attrRemaining = newCharacter.attrRemaining + 1   
        }
        if (newCharacter.attrRemaining < 0) {
            return [false, newCharacter]
        } else {
            return [true, newCharacter]
        }

    }


    // Point Buy System to increment remaining attribute points
    const incrementRemainingPoints = (attr, direction, newCharacter) => {
        if (direction === 1) {
            if (newCharacter[attr] > 4) {
                newCharacter.attrRemaining = newCharacter.attrRemaining - 3
            } else if (newCharacter[attr] > 2) {
                newCharacter.attrRemaining = newCharacter.attrRemaining - 2
            } else {
                newCharacter.attrRemaining = newCharacter.attrRemaining - 1
            }
        } else {
            if (newCharacter[attr] > 3) {
                newCharacter.attrRemaining = newCharacter.attrRemaining + 3
            } else if (newCharacter[attr] > 1) {
                newCharacter.attrRemaining = newCharacter.attrRemaining + 2
            } else {
                newCharacter.attrRemaining = newCharacter.attrRemaining + 1
            }
        }
        if (newCharacter.attrRemaining < 0) {
            return [false, newCharacter]
        } else {
            return [true, newCharacter]
        }
        
    }   


    // adds and removes skills to character sheet
    const handleSkill = (skill) => {
        let newCharacter = {...characterSheet}
        if (newCharacter.skills[skill]) {
            newCharacter.skillArray = newCharacter.skillArray.filter(e => e !== `${skill}`);
            newCharacter.skills[skill] = false
            newCharacter.skillsRemaining += 1
        } else {
            if (newCharacter.skillsRemaining <= 0) return
            newCharacter.skillArray.push(skill)
            newCharacter.skills[skill] = true
            newCharacter.skillsRemaining -= 1
        }
        setCharacterSheet(newCharacter)
    }

    // capitalize the first letter in a string
    const capitalize = (str) =>{
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1)
    }

    return (
        <div className={"character-creation-content"} >
            <div className="character-creation-profile" >
                <img  src={`/assets/${characterSheet.race}.png`} />
            </div>
            <div className={"character-creation-dropdown"} >
                <select onChange={(event) => handleSelection(event, "race")} name="race" id="race" defaultValue={characterSheet.race} >
                    <option value="elf" >Elf</option>
                    <option value="dwarf"  >Dwarf</option>
                    <option value="gnome" >Gnome</option>
                    <option value="human">Human</option>
                </select>

                <div className='character-creation-name' >
                    <input onChange={updateName} placeholder='Name' />
                </div>

                <select onChange={(event) => handleSelection(event, "class")}  name="class" id="class" defaultValue={characterSheet.class} >
                    <option value="warrior">Warrior</option>
                    <option value="wizard">Wizard</option>
                    <option value="druid">Druid</option>
                    <option value="bard">Bard</option>
                </select>
            </div>

            <div className='character-creation-skills-container' >
                <div onClick={()=>handleSkill('lucky')}  className={characterSheet.skills.lucky ? 'character-creation-skills-clicked' : 'character-creation-skills-not-clicked'} >Lucky</div>
                <div onClick={()=>handleSkill('strong')} className={characterSheet.skills.strong ? 'character-creation-skills-clicked' : 'character-creation-skills-not-clicked'} >Strong</div>
                <div onClick={()=>handleSkill('wise')} className={characterSheet.skills.wise ? 'character-creation-skills-clicked' : 'character-creation-skills-not-clicked'} >Wise</div>
                <div onClick={()=>handleSkill('likable')} className={characterSheet.skills.likable ? 'character-creation-skills-clicked' : 'character-creation-skills-not-clicked'} >Likable</div>
                <div onClick={()=>handleSkill('sneaky')} className={characterSheet.skills.sneaky ? 'character-creation-skills-clicked' : 'character-creation-skills-not-clicked'} >Sneaky</div>
            </div>
 
            <div className='character-creation-attributes' >
                <div  className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "str", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.str > 0 || characterSheet.raceBonus.str ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.str  + characterSheet.raceBonus.str + characterSheet.classBonus.str}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "str", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >STR</div>
                </div>
                <div className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "con", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.con > 0 || characterSheet.raceBonus.con ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.con  + characterSheet.raceBonus.con + characterSheet.classBonus.con}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "con", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >CON</div>
                </div>
                <div className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "dex", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.dex > 0 || characterSheet.raceBonus.dex ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.dex  + characterSheet.raceBonus.dex + characterSheet.classBonus.dex}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "dex", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >DEX</div>
                </div>
                <div className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "int", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.int > 0 || characterSheet.raceBonus.int ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.int  + characterSheet.raceBonus.int + characterSheet.classBonus.int}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "int", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >INT</div>
                </div>
                <div className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "cha", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.cha > 0 || characterSheet.raceBonus.cha ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.cha  + characterSheet.raceBonus.cha + characterSheet.classBonus.cha}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "cha", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >CHA</div>
                </div>
                <div className='character-creation-attributes-container' >
                    <IonIcon onClick={(event) => handleIncrement(event, "luc", 1)} className='character-creation-attributes-button-top' icon={chevronUp} />
                        <div className={'character-creation-attributes-number' + `${characterSheet.classBonus.luc > 0 || characterSheet.raceBonus.luc ? ' character-creation-attributes-number-bonus' : ''}`} >{characterSheet.luc  + characterSheet.raceBonus.luc + characterSheet.classBonus.luc}</div>
                    <IonIcon onClick={(event) => handleIncrement(event, "luc", -1)} className='character-creation-attributes-button-bottom' icon={chevronDown} />
                    <div className='character-creation-attributes-text' >LUC</div>
                </div>
            </div>

            <div className='character-creation-points' >
                <div>{characterSheet.attrRemaining} points and</div>
                <div>{characterSheet.skillsRemaining} skills</div>
            </div>

            <div className='character-creation-description' >
                <div className='character-creation-description-details' >{capitalize(characterSheet.race)} {characterSheet.class}s {characterSheet[characterSheet.race]} {characterSheet[characterSheet.class]}</div>
                {characterSheet.skillArray.map((skill, idx)=>{
                    return <div id={idx} className='character-creation-description-details' >{capitalize(skill)}: {characterSheet[skill]}</div>
                })}
            </div>

            <div className='character-creation-start' >
                <div onPointerDown={ toggleStartClass } onPointerUp={ toggleStartClass }  className={start}>
                    <div>Start</div>
                </div>
            </div>
        </div>
    )
  
}

export default CharacterCreation
