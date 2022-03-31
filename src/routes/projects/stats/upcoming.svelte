<script>
    import { onMount } from "svelte";

    const data = {
        labels: [
            "Next 7",
            "Next 30",
            "Then 60",
            "Then 90",
            "Then 120",
            "Then 150",
        ],
        datasets: [
            {
                label: "Frequency Pressure",
                data: [1, 2, 3, 4, 12, 7],
                borderColor: "#f00",
                backgroundColor: "#f00",
                fill: false,
                stepped: true,
            },
        ],
    };

    const config = {
        type: "line",
        data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                axis: "x",
            },
        },
    };

    let chartCont;

    onMount(() => {
        new Chart(chartCont, config);
    });
</script>

<canvas id="myChart" bind:this={chartCont} />
