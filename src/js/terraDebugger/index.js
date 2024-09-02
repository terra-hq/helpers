import {breakpoints} from '../breakpoints/index.js';

export const terraDebugger = (payload) => {
  // Destructuring the payload to get clickupDashboard
  const { submitQA } = payload;
  
  // Create the div element for the breakpoint indicator
  const indicator = document.createElement('div');
  indicator.id = 'breakpoint-indicator';

  // Styles for the rectangle
  indicator.style.position = 'fixed';
  indicator.style.bottom = '20px';
  indicator.style.right = '20px';
  indicator.style.width = '240px'; // Width of the rectangle
  indicator.style.height = 'auto'; // Height to adjust based on content
  indicator.style.borderRadius = '8px'; // Slightly rounded corners
  indicator.style.backgroundColor = '#3a2929';
  indicator.style.color = 'white';
  indicator.style.display = 'flex';
  indicator.style.flexDirection = 'column'; // Align text in columns
  indicator.style.justifyContent = 'center';
  indicator.style.alignItems = 'center';
  indicator.style.fontSize = '12px';
  indicator.style.fontWeight = 'bold';
  indicator.style.zIndex = '1000';
  indicator.style.textAlign = 'center';
  indicator.style.padding = '10px'; // Add padding for better text readability

  // Add the rectangle to the body of the document
  document.body.appendChild(indicator);

  // Function to determine the breakpoint name based on the window width
  const updateIndicatorText = () => {
    const width = window.innerWidth;
    let breakpointName = 'desktop'; // Default value

    if (width <= breakpoints[0].mobile) {
      breakpointName = 'mobile';
    } else if (width <= breakpoints[1].tablets) {
      breakpointName = 'tablets';
    } else if (width <= breakpoints[2].tabletm) {
      breakpointName = 'tabletm';
    } else if (width <= breakpoints[3].tabletl) {
      breakpointName = 'tabletl';
    } else if (width <= breakpoints[4].laptop) {
      breakpointName = 'laptop';
    } else {
      breakpointName = 'desktop';
    }

    // Update the text of the indicator
    let indicatorContent = `BKPT : ${breakpointName} | Current Size ${width}px`;

    // Only add the link if clickupDashboard is defined
    if (submitQA) {
      indicatorContent += `<br><a href="${submitQA}" target="_blank" style="color: white; text-decoration: underline;">Open Clickup Dashboard</a>`;
    }

    indicator.innerHTML = indicatorContent;
  };

  // Update the text when the window is resized
  window.addEventListener('resize', updateIndicatorText);

  // Call the function on load to set the initial value
  updateIndicatorText();
};