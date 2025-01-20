const canvas = document.getElementById('studentChart');
    const ctx = canvas.getContext('2d');

    // Chart Data
    const data = {
      years: ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'],
      male: [294, 357, 394, 381, 383, 390],
      female: [142, 184, 213, 221, 222, 201]
    };

    // Responsive Canvas Dimensions
    function resizeCanvas() {
      const containerWidth = document.querySelector('.chart-container').offsetWidth;
      canvas.width = containerWidth * 2; // High resolution for sharp rendering
      canvas.height = (containerWidth / 2) * 2; // Maintain 2:1 aspect ratio
    }

    // Initialize Variables
    let animationProgress = 0; // Track animation progress (0 to 1)

    // Function to Draw Chart
    function drawChart(progress) {
      const chartWidth = canvas.width;
      const chartHeight = canvas.height;
      const padding = 50;
      const barWidth = Math.max(20, (chartWidth - 2 * padding) / (data.years.length * 3)); // Bar width adjusts to screen
      const barSpacing = barWidth / 2;
      const maxBarHeight = chartHeight - 2 * padding;

      const maxDataValue = Math.max(...data.male, ...data.female);
      const scaleY = maxBarHeight / maxDataValue;

      // Clear canvas
      ctx.clearRect(0, 0, chartWidth, chartHeight);

      // Draw Axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, chartHeight - padding);
      ctx.lineTo(chartWidth - padding, chartHeight - padding);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Horizontal Lines
      for (let i = 0; i <= 5; i++) {
        const y = chartHeight - padding - (i * maxBarHeight / 5);
        const label = Math.round((i * maxDataValue) / 5);

        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(chartWidth - padding, y);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add scale labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(label, padding - 10, y + 5);
      }

      // Draw Bars
      data.years.forEach((year, index) => {
        const xBase = padding + index * (barWidth * 2 + barSpacing * 2);

        // Male bar
        const maleHeight = data.male[index] * scaleY * progress;
        ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.fillRect(
          xBase,
          chartHeight - padding - maleHeight,
          barWidth,
          maleHeight
        );
        ctx.strokeRect(
          xBase,
          chartHeight - padding - maleHeight,
          barWidth,
          maleHeight
        );

        // Female bar
        const femaleHeight = data.female[index] * scaleY * progress;
        ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.fillRect(
          xBase + barWidth + barSpacing,
          chartHeight - padding - femaleHeight,
          barWidth,
          femaleHeight
        );
        ctx.strokeRect(
          xBase + barWidth + barSpacing,
          chartHeight - padding - femaleHeight,
          barWidth,
          femaleHeight
        );

        // Add Year Labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          year,
          xBase + barWidth + barSpacing / 2,
          chartHeight - padding + 20
        );

        // Add Values on Top of Bars
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        // Male value
        ctx.fillText(
          data.male[index],
          xBase + barWidth / 2,
          chartHeight - padding - maleHeight - 10
        );
        // Female value
        ctx.fillText(
          data.female[index],
          xBase + barWidth + barSpacing + barWidth / 2,
          chartHeight - padding - femaleHeight - 10
        );
      });
    }

    // Animate Bars
    function animateBars() {
      animationProgress += 0.02;
      if (animationProgress > 1) animationProgress = 1;
      drawChart(animationProgress);

      if (animationProgress < 1) {
        requestAnimationFrame(animateBars); // Continue animation
      }
    }

    // Resize and Redraw Chart
    function handleResize() {
      resizeCanvas();
      drawChart(animationProgress);
    }

    window.addEventListener('resize', handleResize);

    // Initialize Chart
    resizeCanvas();
    animateBars();