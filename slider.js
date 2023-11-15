let btn1 = document.querySelector('.left_js')
let btn2 = document.querySelector('.right_js')
let pLine = document.querySelector('.pLine_js')

let moveAuto = setInterval(swipe,4000, -1)

const size = 1280
const right = size*6

btn1.addEventListener('click',function(){
    clearInterval(moveAuto)
    swipe(1)
    moveAuto = setInterval(swipe,4000, -1)

})
btn2.addEventListener('click',function(){
    clearInterval(moveAuto)
    swipe(-1)
    moveAuto = setInterval(swipe,4000, -1)
})

function swipe(sign){
    let pos = +pLine.style.left.slice(0, -2)
    if(pos % size === 0) {
        if (pos === -right && sign === -1) {
            pos = 0
            pLine.style.left = pos + 'px'
        }
        else if (pos === 0 && sign === 1) {
            pos = -right
            pLine.style.left = pos + 'px'
        }
        animate({
            duration: 1500,
            timing(timeFraction) {
                return Math.pow(timeFraction, 2)
            },
            draw(progress) {
                pLine.style.left = pos + progress * sign * size + 'px';
            }
        })
    }
}
function animate({duration, draw, timing})
{
    let start = performance.now()

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration
        if (timeFraction > 1)
            timeFraction = 1

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction)

        draw(progress) // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate)
        }

    });
}
