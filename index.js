
const background = document.querySelector('#loading')
const img1 = document.querySelector('#img1')
const img2 = document.querySelector('#img2')
const img3 = document.querySelector('#img3')
const adamo = document.querySelector('#adamo')
const video = document.getElementById('myVideo')


const img_tl = gsap.timeline({ repeat: -1 })


const animate_loading = () => {
    img_tl
        .from(img1, {
            onStart: () => {
                img1.style.display = 'block'
                adamo.style.display = 'block'
            },
            // delay: 1,
            scaleY: 0,
            transformOrigin: 'center bottom',
            duration: 2,
            repeat: 1,
            yoyo: true,
        })
        .to(adamo, {
            opacity: 1,
            duration: 1,
        }, '<')
        .to(adamo, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                img1.style.display = 'none'
                adamo.style.display = 'none'
            }
        })

        .from(img2, {
            onStart: () => {
                img2.style.display = 'block'
                adamo.style.display = 'block'
            },
            // delay: 1,
            scaleY: 0,
            transformOrigin: 'center bottom',
            duration: 2,
            repeat: 1,
            yoyo: true,
        })
        .to(adamo, {
            opacity: 1,
            duration: 1,
        }, '<')
        .to(adamo, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                img2.style.display = 'none'
                adamo.style.display = 'none'
            }
        })

        .from(img3, {
            onStart: () => {
                img3.style.display = 'block'
                adamo.style.display = 'block'
            },
            // delay: 1,
            scaleY: 0,
            transformOrigin: 'center bottom',
            duration: 2,
            repeat: 1,
            yoyo: true,
        })
        .to(adamo, {
            opacity: 1,
            duration: 1,
        }, '<')
        .to(adamo, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                img3.style.display = 'none'
                adamo.style.display = 'none'
            }
        })
}

const decide_to_animate = () => {
    const my_images_array = [img1, img2, img3, adamo]

    let count = 0

    my_images_array.forEach(element => {
        if (element.complete) {
            count++;
            if (count === my_images_array.length) animate_loading()
        }
        else {
            element.addEventListener('load', () => {
                count++;
                if (count === my_images_array.length) animate_loading()
            })
        }
    });
}

decide_to_animate()

const animate_main = () => {
    const tl = gsap.timeline()
    const h1 = document.querySelector('main h1')
    const vl = document.querySelector('.vl')
    const btn = document.querySelector('main button')
    const main = document.querySelector('main')

    main.style.display = 'flex'

    tl

    .from(vl, {
        opacity: 0,
        height: '0px',
        duration: 2,
    })
    .from(h1, {
        opacity: 0,
        y: -200,
        duration: 2,
    })
    .from(btn, {
        opacity: 0,
        y: 200,
        duration: 2,
    })
    
}

const disable_background = () => {
    gsap.to(background, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => background.style.display = 'none'
    })
    img_tl.kill()
    animate_main()
}



window.addEventListener('load', () => {
    const src = video.currentSrc;
    const entry = performance.getEntriesByType('resource')
        .find(r => r.name === src);

    if (entry && entry.transferSize === 0) {
        disable_background()
    }
    else if (video.readyState === 4) {
        disable_background()
    }
    else {
        video.addEventListener('canplaythrough', () => {
            disable_background()
        })
    }

})

