import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBg = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => (
      {
        autoPlay: true,
        background: {
          color: {
            value: "#000000"
          },
          image: "",  
          position: "",
          repeat: "",
          size: "",
          opacity: 1
        },
        backgroundMask: {
          composite: "destination-out",
          cover: {
            color: {
              value: "#fff"
            },
            opacity: 1
          },
          enable: false
        },
        clear: true,
        defaultThemes: {},
        delay: 0,
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: {
              enable: true,
              mode: []
            },
            onDiv: {
              selectors: [],
              enable: true,
              mode: [],
              type: "circle"
            },
            onHover: {
              enable: true,
              mode: "trail",
              parallax: {
                enable: true,
                force: 2,
                smooth: 10
              }
            },
            resize: {
              delay: 0.5,
              enable: true
            }
          },
          modes: {
            trail: {
              delay: 0.005,
              pauseOnStop: true,
              quantity: 5,
              particles: {
                color: {
                  value: "#ff0000",
                  animation: {
                    enable: true,
                    speed: 400,
                    sync: true
                  }
                },
                collisions: {
                  enable: true
                },
                links: {
                  enable: true
                },
                move: {
                  outModes: {
                    default: "destroy"
                  },
                  speed: 2
                },
                size: {
                  value: {
                    min: 1,
                    max: 5
                  },
                  animation: {
                    enable: true,
                    speed: 5,
                    sync: true,
                    startValue: "min",
                    destroy: "max"
                  }
                }
              }
            },
            attract: {
              distance: 200,
              duration: 0.4,
              easing: "ease-out-quad",
              factor: 1,
              maxSpeed: 50,
              speed: 1
            },
            bounce: {
              distance: 200
            },
            bubble: {
              distance: 200,
              duration: 0.4,
              mix: false,
              divs: {
                distance: 200,
                duration: 0.4,
                mix: true,
                selectors: []
              }
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5
              },
              radius: 60
            },
            grab: {
              distance: 100,
              links: {
                blink: true,
                consent: true,
                opacity: 1
              }
            },
            push: {
              default: true,
              groups: [],
              quantity: 4
            },
            remove: {
              quantity: 2
            },
            repulse: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
              divs: {
                distance: 200,
                duration: 0.4,
                factor: 100,
                speed: 1,
                maxSpeed: 50,
                easing: "ease-out-quad",
                selectors: []
              }
            },
            slow: {
              factor: 3,
              radius: 200
            },
            light: {
              area: {
                gradient: {
                  start: {
                    value: "#ffffff"
                  },
                  stop: {
                    value: "#000000"
                  }
                },
                radius: 1000
              },
              shadow: {
                color: {
                  value: "#000000"
                },
                length: 2000
              }
            }
          }
        },
        manualParticles: [],
        particles: {
          bounce: {
            horizontal: {
              value: 1
            },
            vertical: {
              value: 1
            }
          },
          collisions: {
            absorb: {
              speed: 2
            },
            bounce: {
              horizontal: {
                value: 1
              },
              vertical: {
                value: 1
              }
            },
            enable: true,
            maxSpeed: 50,
            mode: "bounce",
            overlap: {
              enable: true,
              retries: 0
            }
          },
          color: {
            value: "#ff0000",
            animation: {
              h: {
                count: 0,
                enable: true,
                speed: 50,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              s: {
                count: 0,
                enable: true,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              },
              l: {
                count: 0,
                enable: true,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0
              }
            }
          },
          effect: {
            close: true,
            fill: true,
            options: {},
            type: []
          },
          groups: {},
          move: {
            angle: {
              offset: 0,
              value: 90
            },
            attract: {
              distance: 200,
              enable: false,
              rotate: {
                x: 3000,
                y: 3000
              }
            },
            center: {
              x: 50,
              y: 50,
              mode: "percent",
              radius: 0
            },
            decay: 0,
            distance: {},
            direction: "none",
            drift: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              inverse: false,
              maxSpeed: 50
            },
            path: {
              clamp: true,
              delay: {
                value: 0
              },
              enable: true,
              options: {}
            },
            outModes: {
              default: "out",
              bottom: "out",
              left: "out",
              right: "out",
              top: "out"
            },
            random: true,
            size: true,
            speed: 10,
            spin: {
              acceleration: 0,
              enable: false
            },
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fill: {}
            },
            vibrate: false,
            warp: false
          },
          number: {
            value: 1000, // increased from 100 to 200
            density: {
              enable: true,
              width: 1920,
              height: 1080
            },
            limit: {
              mode: "delete",
              value: 0
            },
            value: 200
          },
          opacity: {
            value: {
              min: 0.3,
              max: 0.8
            },
            animation: {
              count: 0,
              enable: true,
              speed: 0.1,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          reduceDuplicates: true,
          shadow: {
            blur: 0,
            color: {
              value: "#000"
            },
            enable: true,
            offset: {
              x: 0,
              y: 0
            }
          },
          shape: {
            close: true,
            fill: true,
            options: {},
            type: "star"
          },
          size: {
            value: {
              min: 1,
              max: 3
            },
            animation: {
              count: 0,
              enable: true,
              speed: 3,
              decay: 0,
              delay: 0,
              sync: false,
              mode: "auto",
              startValue: "random",
              destroy: "none"
            }
          },
          stroke: {
            width: 0
          },
          zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1
          },
          destroy: {
            bounds: {},
            mode: "none",
            split: {
              count: 1,
              factor: {
                value: 3
              },
              rate: {
                value: {
                  min: 4,
                  max: 9
                }
              },
              sizeOffset: true,
              particles: {}
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 0
            },
            enable: true,
            enlighten: {
              enable: false,
              value: 0
            },
            mode: "vertical",
            speed: 25
          },
          tilt: {
            value: 0,
            animation: {
              enable: true,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            enable: false
          },
          twinkle: {
            lines: {
              enable: true,
              frequency: 0.05,
              opacity: 1
            },
            particles: {
              enable: true,
              frequency: 1,
              opacity: 1
            }
          },
          wobble: {
            distance: 10,
            enable: true,
            speed: {
              angle: 50,
              move: 10
            }
          },
          life: {
            count: 0,
            delay: {
              value: 0,
              sync: false
            },
            duration: {
              value: 0,
              sync: true
            }
          },
          rotate: {
            value: 0,
            animation: {
              enable: true,
              speed: 0,
              decay: 0,
              sync: false
            },
            direction: "clockwise",
            path: false
          },
          orbit: {
            animation: {
              count: 0,
              enable: true,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: false
            },
            enable: true,
            opacity: 1,
            rotation: {
              value: 45
            },
            width: 1
          },
          links: {
            blink: false,
            color: {
              value: "random"
            },
            consent: false,
            distance: 100,
            enable: true,
            frequency: 1,
            opacity: 1,
            shadow: {
              blur: 5,
              color: {
                value: "#000"
              },
              enable: true
            },
            triangles: {
              enable: true,
              frequency: 1
            },
            width: 1,
            warp: false
          },
          repulse: {
            value: 0,
            enabled: false,
            distance: 1,
            duration: 1,
            factor: 1,
            speed: 1
          }
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        smooth: false,
        style: {},
        themes: [],
        zLayers: 100,
        emitters: [],
        motion: {
          disable: false,
          reduce: {
            factor: 4,
            value: true
          }
        }
      }
    ),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}

export default ParticlesBg