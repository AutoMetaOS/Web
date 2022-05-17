<script>
    import { onMount } from "svelte";
    import { F } from "predefined";
    const pi = Math.PI;
    const points = 10;
    const circles = [];
    const [rangeMin, rangeMax] = [1, 20];
    let tick = 0;

    const cycle = (num1, num2) => ((num1 % num2) + num2) % num2;

    function random(num1, num2) {
        let max = Math.max(num1, num2);
        let min = Math.min(num1, num2);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onMount(() => {
        const dpr = window.devicePixelRatio || 1;
        const radius = 100 * dpr;
        const h = 300 * dpr;
        const w = 300 * dpr;
        const center = { x: (w / 2) * dpr, y: (h / 2) * dpr };

        const el = F("#canvas").sel()[0];
        const ctx = el.getContext("2d");

        const gradienter = (i) => {
            const colors = [
                ["#2af", "#6adc99"],
                ["#48c6ef", "#6f86d6"],
                ["#9795f0", "#70F"],
                ["#F59", "#E37"],
            ];
            const gradient = ctx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, colors[i][0]);
            gradient.addColorStop(1, colors[i][1]);
            return gradient;
        };

        const gradients = Array.from(Array(4).keys()).map(gradienter);

        ctx.scale(dpr, dpr);

        el.width = w * dpr;
        el.height = h * dpr;
        el.style.width = w + "px";
        el.style.height = h + "px";

        for (let idx = 0; idx <= gradients.length - 1; idx++) {
            let swingpoints = [];
            let radian = 0;

            for (let i = 0; i < points; i++) {
                radian = ((pi * 2) / points) * i;
                let ptX = center.x + radius * Math.cos(radian);
                let ptY = center.y + radius * Math.sin(radian);

                swingpoints.push({
                    x: ptX,
                    y: ptY,
                    radian: radian,
                    range: random(rangeMin, rangeMax),
                    phase: 0,
                });
            }

            circles.push(swingpoints);
        }

        function swingCircle() {
            ctx.clearRect(0, 0, w * dpr, h * dpr);
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "screen";

            for (let k = 0; k < circles.length; k++) {
                let swingpoints = circles[k];

                for (let i = 0; i < swingpoints.length; i++) {
                    swingpoints[i].phase += random(1, 10) * -0.01;

                    let phase = 4 * Math.sin(tick / 65);
                    let r =
                        radius +
                        swingpoints[i].range *
                            phase *
                            Math.sin(swingpoints[i].phase) -
                        rangeMax;

                    swingpoints[i].radian += pi / 360;

                    let ptX = center.x + r * Math.cos(swingpoints[i].radian);
                    let ptY = center.y + r * Math.sin(swingpoints[i].radian);

                    swingpoints[i] = {
                        x: ptX,
                        y: ptY,
                        radian: swingpoints[i].radian,
                        range: swingpoints[i].range,
                        phase: swingpoints[i].phase,
                    };
                }

                const fill = gradients[k];
                drawCurve(swingpoints, fill);
            }
            tick++;
            requestAnimationFrame(swingCircle);
        }
        requestAnimationFrame(swingCircle);

        function drawCurve(pts, fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.beginPath();
            ctx.moveTo(
                (pts[cycle(-1, points)].x + pts[0].x) / 2,
                (pts[cycle(-1, points)].y + pts[0].y) / 2
            );
            for (let i = 0; i < pts.length; i++) {
                ctx.quadraticCurveTo(
                    pts[i].x,
                    pts[i].y,
                    (pts[i].x + pts[cycle(i + 1, points)].x) / 2,
                    (pts[i].y + pts[cycle(i + 1, points)].y) / 2
                );
            }

            ctx.closePath();
            ctx.fill();
        }
    });
</script>

<div class="†c w-100" style="height:300px">
    <canvas class="fade-down w-100 h-100" id="canvas" />
    <div class="fade-down w-100 h-100 ƒ ∆-ct †c copy">
        <h1 class="m0">AMOS</h1>
    </div>
</div>

<style type="text/scss">
    #canvas {
        height: 300px;
        width: 300px;
    }
    .copy {
        position: absolute;
        top: -20%;
        left: 0;
        align-items: center;
        pointer-events: none;
        z-index: 100;

        h1 {
            color: #6f86d6;
            letter-spacing: 1px;
            font-size: 6em;
            font-weight: 700;
            background: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
            background: -moz-linear-gradient(transparent, transparent);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>
