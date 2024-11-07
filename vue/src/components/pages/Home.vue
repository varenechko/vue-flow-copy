<template>
    <div class="background-container">
        <div class="block1" @click="onClick" />
        <div class="block2" @click="onClick" />
        <div class="line-wrapper" :style="lineWrapperStyle">
            <div class="line" :style="lineStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            start: null,
            end: null,
        };
    },
    computed: {
        lineStyle() {
            const a = Math.abs(this.start?.top - this.end?.top); // Получаем высоту
            const b = Math.abs(this.start?.left - this.end?.left); // Получаем ширину

            const d = Math.sqrt(a * a + b * b); // Высчитываем диагональ
            const sin = a / d; // Синус угла
            const deg = Math.asin(sin) * (180 / Math.PI); // Угол

            return {
                width: `${d}px`, // Задаем длину диагонали
                transform: `rotate(${deg}deg)`, // Угол наклона
            };
        },
        lineWrapperStyle() {
            const left =
                this.start?.left < this.end?.left
                    ? this.start?.left
                    : this.end?.left;
            const top =
                this.start?.top < this.end?.top
                    ? this.start?.top
                    : this.end?.top;
            const width = Math.abs(this.start?.left - this.end?.left);
            const height = Math.abs(this.start?.top - this.end?.top);

            return {
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
            };
        },
    },
    methods: {
        onClick(event) {
            console.log(event);

            if (!this.start) {
                this.start = {
                    left: event.target.offsetLeft + 50,
                    top: event.target.offsetTop + 100,
                };
                console.log('start', JSON.stringify(this.start));
            } else if (!this.end) {
                this.end = {
                    left: event.target.offsetLeft + 50,
                    top: event.target.offsetTop + 100,
                };
                console.log('end', JSON.stringify(this.end));
            }
        },
    },
};
</script>

<style>
.background-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: black;
    align-items: center;
    justify-content: center;
}
.block1 {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background-color: white;
    position: absolute;
    left: 100px;
    top: 100px;
}
.block2 {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background-color: white;
    position: absolute;
    left: 500px;
    top: 500px;
}
.line-wrapper {
    position: absolute;
}
.line {
    border-top: 1px solid red;
    transform-origin: 0 0;
    position: absolute;
    background-color: orange;
}
</style>
