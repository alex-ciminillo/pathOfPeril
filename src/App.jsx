import {
  IonApp,
  setupIonicReact,
  IonIcon
} from '@ionic/react';

import { playBackOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* React */
import { useState, useEffect } from 'react';

/* Pages */
import Title from './pages/Title';
import CharacterCreation from './pages/CharacterCreation';
import Story from './pages/Story';

/* Flipbook */
import HTMLFlipBook from "react-pageflip";
import React, { forwardRef } from "react";

/* CSS */
import './App.css'

setupIonicReact();

const App = () => {



  const caveStory = {
    path: '',
    description: 'You wake up in a cave',
    img: 'cave.png',
    c: {
      1: {
        requirement: [''],
        description: 'Yell out for help',
        story: 'You yell out, "Someone help me! Is anyone there?!"',
        o: {
          1: {
            requirement: [''],
            img: 'hooded.png',
            path: 'c.1.o.1',
            chance: .1,
            bonus: {
              attr: ['luck', .1]
            },
            description: 'Someone yells back, "Hello?"',
            c: {
              1: {
                requirement: [''],
                description: 'Hide yourself in the shadows',
                story: 'You conceal yourself in the shadows...',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                },
              },
              2: {
                requirement: [''],
                description: 'Yell out again',
                story: 'You yell as loud as you can, "I\'M OVER HERE!!"',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                },
              },
              3: {
                requirement: [''],
                description: 'Go find the person',
                story: 'Diving into the darkness you search for the voice.',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                },
              }
            }
          },
          2: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .8,
            description: 'You hear nothing but your echo...',
          },
          3: {
            requirement: [''],
            img: 'cave.png',
            path: 'c.1.o.1',
            chance: .1,
            description: 'Loud growling answers back',
          }
        }
      },
      2: {
        requirement: [''],
        description: 'Search for a way out',
        story: 'You dive into the darkness in hope to find light',
        o: {
          1: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .7,
            bonus: {
              attr: ['']
            },
            description: 'You walk for what seems like forever but find no light',
            c: {}
          },
          2: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .2,
            bonus: {
              attr: ['']
            },
            description: 'You hear something nearby',
            c: {}
          },
          3: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .1,
            bonus: {
              attr: ['']
            },
            description: 'You see some light... a torch on the wall!',
            c: {}
          },
        }
      },
      3: {
        requirement: [''],
        description: 'Examine your surroundings',
        story: 'You start feeling around in the dark...',
        o: {
          1: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .9,
            bonus: {
              attr: ['']
            },
            description: 'You find nothing',
            c: {}
          },
          2: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .1,
            bonus: {
              attr: ['']
            },
            description: 'You find a torch! And flint!',
            c: {
              1: {
                requirement: [''],
                description: 'Hide yourself in the shadows',
                story: 'You conceal yourself in the shadows...',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                },
              },
              2: {
                requirement: [''],
                description: 'Yell out again',
                story: 'You yell as loud as you can, "I\'M OVER HERE!!"',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {
                        requirement: [''],
                        description: 'Hide yourself in the shadows',
                        story: 'You conceal yourself in the shadows...',
                        o: {
                          1: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: 'c.1.o.1',
                            chance: .8,
                            bonus: {
                              attr: ['']
                            },
                            description: 'You see a shadowy figure walk closer...',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          2: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Someone says from the shadow, "You there, why are you hiding?"',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          3: {
                            requirement: [''],
                            img: 'cave.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Nothing happens and all is silent.',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                        },
                      },
                      2: {
                        requirement: [''],
                        description: 'Yell out again',
                        story: 'You yell as loud as you can, "I\'M OVER HERE!!"',
                        o: {
                          1: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: 'c.1.o.1',
                            chance: .8,
                            bonus: {
                              attr: ['']
                            },
                            description: 'You see a shadowy figure walk closer...',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          2: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Someone says from the shadow, "You there, why are you hiding?"',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          3: {
                            requirement: [''],
                            img: 'cave.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Nothing happens and all is silent.',
                            c: {
                              1: {
                                requirement: [''],
                                description: 'Hide yourself in the shadows',
                                story: 'You conceal yourself in the shadows...',
                                o: {
                                  1: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: 'c.1.o.1',
                                    chance: .8,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'You see a shadowy figure walk closer...',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  2: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  3: {
                                    requirement: [''],
                                    img: 'cave.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Nothing happens and all is silent.',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                },
                              },
                              2: {
                                requirement: [''],
                                description: 'Yell out again',
                                story: 'You yell as loud as you can, "I\'M OVER HERE!!"',
                                o: {
                                  1: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: 'c.1.o.1',
                                    chance: .8,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'You see a shadowy figure walk closer...',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  2: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  3: {
                                    requirement: [''],
                                    img: 'cave.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Nothing happens and all is silent.',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                },
                              },
                              3: {
                                requirement: [''],
                                description: 'Go find the person',
                                story: 'Diving into the darkness you search for the voice.',
                                o: {
                                  1: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: 'c.1.o.1',
                                    chance: .8,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'You see a shadowy figure walk closer...',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  2: {
                                    requirement: [''],
                                    img: 'hooded.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                  3: {
                                    requirement: [''],
                                    img: 'cave.png',
                                    path: '',
                                    chance: .1,
                                    bonus: {
                                      attr: ['']
                                    },
                                    description: 'Nothing happens and all is silent.',
                                    c: {
                                      1: {},
                                      2: {},
                                      3: {}
                                    }
                                  },
                                },
                              }
                            }
                          },
                        },
                      },
                      3: {
                        requirement: [''],
                        description: 'Go find the person',
                        story: 'Diving into the darkness you search for the voice.',
                        o: {
                          1: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: 'c.1.o.1',
                            chance: .8,
                            bonus: {
                              attr: ['']
                            },
                            description: 'You see a shadowy figure walk closer...',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          2: {
                            requirement: [''],
                            img: 'hooded.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Someone says from the shadow, "You there, why are you hiding?"',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                          3: {
                            requirement: [''],
                            img: 'cave.png',
                            path: '',
                            chance: .1,
                            bonus: {
                              attr: ['']
                            },
                            description: 'Nothing happens and all is silent.',
                            c: {
                              1: {},
                              2: {},
                              3: {}
                            }
                          },
                        },
                      }
                    }
                  },
                },
              },
              3: {
                requirement: [''],
                description: 'Go find the person',
                story: 'Diving into the darkness you search for the voice.',
                o: {
                  1: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: 'c.1.o.1',
                    chance: .8,
                    bonus: {
                      attr: ['']
                    },
                    description: 'You see a shadowy figure walk closer...',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  2: {
                    requirement: [''],
                    img: 'hooded.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Someone says from the shadow, "You there, why are you hiding?"',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                  3: {
                    requirement: [''],
                    img: 'cave.png',
                    path: '',
                    chance: .1,
                    bonus: {
                      attr: ['']
                    },
                    description: 'Nothing happens and all is silent.',
                    c: {
                      1: {},
                      2: {},
                      3: {}
                    }
                  },
                },
              }
            }
          },
          3: {
            requirement: [''],
            img: 'cave.png',
            path: '',
            chance: .9,
            bonus: {
              attr: ['']
            },
            description: 'You find nothing',
            c: {}
          },
        }
      },
    }
  }


  const [choiceRecord, setChoiceRecord] = useState(['description'])
  const [pic, setPic] = useState(0)
  const outcomeObject = {
    o: {
      1: {
        requirement: [''],
        img: 'cave.png',
        path: '',
        chance: 0,
        bonus: {
          attr: ['']
        },
        description: '',
        c: {}
      },
    }
  }
  const choiceObject = {
    c: {
      1: {
        requirement: [''],
        description: '',
        story: '',
        o: {}
      }
    }
  }

  // Used to turn string path of object into outcome
  function resolve(path, obj, separator = '.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev?.[curr], obj)
  }

  const startingCharacter = {
    skillArray: [],
    skillsRemaining: 3,
    str: 0,
    int: 0,
    luc: 0,
    cha: 0,
    dex: 0,
    con: 0,
    race: 'gnome',
    class: 'druid',
    raceBonus: {
      str: 0,
      int: 0,
      luc: 1,
      cha: 0,
      dex: 0,
      con: 0
    },
    classBonus: {
      str: 0,
      int: 0,
      luc: 0,
      cha: 0,
      dex: 1,
      con: 0
    },
    attrRemaining: 5,
    skills: {
      lucky: false,
      wise: false,
      strong: false,
      likable: false,
      sneaky: false
    },
    human: 'are pioneers',
    dwarf: 'are adventurous',
    gnome: 'are lucky',
    elf: 'are prideful',
    druid: 'and love nature',
    warrior: 'and tough',
    wizard: 'and magical',
    bard: 'and fun',
    name: '',
    lucky: 'Lady luck smiles on you',
    wise: 'You see what others do not',
    strong: 'Nothing is too heavy',
    likable: 'Socializing is easy',
    sneaky: 'You move in the shadows',
    path: caveStory.path,
    tags: {
      lucky: false,
      wise: false,
      strong: false,
      likable: false,
      sneaky: false,
      human: false,
      dwarf: false,
      gnome: false,
      elf: false,
      druid: false,
      warrior: false,
      wizard: false,
      bard: false,
    }
  }
  const [characterSheet, setCharacterSheet] = useState(startingCharacter)

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();

  const flipbook = React.useRef(null);

  const flipPage = React.useCallback((pageNum) => {
    const pageFlipObj = flipbook.current.pageFlip();

    if (pageNum) {
      pageFlipObj.flip(pageNum, 'top');
    } else if (
      pageFlipObj?.getCurrentPageIndex() + 2 ===
      pageFlipObj?.getPageCount()
    ) {
      pageFlipObj.flip(0);
    } else {
      pageFlipObj.flipNext();
    }
  }, [flipbook]);


  return (
    <IonApp>
      <HTMLFlipBook width={width} height={height} size='fixed' useMouseEvents={false} ref={flipbook} >


<div className='page' ><Title flipPage={flipPage} /></div>
        
        <div className='page' ><CharacterCreation flipPage={flipPage} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} /></div>
        
        <div className='page' ><Story pic={pic} setPic={setPic} choiceRecord={choiceRecord} setChoiceRecord={setChoiceRecord} flipPage={flipPage} characterSheet={characterSheet} setCharacterSheet={setCharacterSheet} caveStory={caveStory} /></div>
        <div className='page'  >
          <div className='story-content' >
            <div onClick={() => flipPage(2)} style={{ alignText: 'left', width: '100%', alignSelf: 'left', zIndex: '99999' }} >
              <div style={{ padding: '0px 30px', fontSize: '40px', opacity: '.7' }} ><IonIcon icon={playBackOutline} /></div>
            </div>
            <div style={{ width: '100%', maxHeight: '100%', display: 'flex' }} >
              <div className={'story-description3'} style={{maxHeight: '50%'}}  >
                {choiceRecord.map((pastchoice, idx) => {
 
                  return <div key={idx} >{resolve(pastchoice, caveStory)}</div>

                })} 
              </div> 
            </div>
          </div>
        </div>


      </HTMLFlipBook>
    </IonApp>
  )
};

export default App;
