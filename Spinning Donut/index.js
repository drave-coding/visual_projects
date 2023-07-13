(function() {
    var preTag = document.getElementById('donut');

    //Angles, Radius and Constants
    var A = 1;
    var B = 1;
    

    //Function to render ASCII frame
    function renderAsciiFrame() {
        var stay = [];//Array to stay ascii chars
        var hold = []; //Array to store depth Values

        var width = 150; // Width

        var height = 80; // Height

        A += 0.07;// Increment of angle A
        B += 0.03;//Increment of angle B
        //Sin and Cosine of angles
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        //Initialize arrays with default angles
        for(var k = 0;k<width * height;k++){
            //Set default ascii char
            stay[k] = k % width == width - 1 ? '\n' : ' ';
            //Set default depth
            hold[k] = 0;
        }

        //Generate the ascii frame
        for(var j = 0; j< 6.28; j += 0.07){
            var ct = Math.cos(j); //Cosine of j
            var st = Math.sin(j); //Sin of j

            for(var i = 0; i < 6.28; i += 0.02){
                var sp = Math.sin(i); //Sin of i
                cp = Math.cos(i), //Cosine of i
                    h = ct + 2,//Height Calculation
                    //Distance Calculation
                    D = 1 / (sp * h * sA + st * cA + 5),
                    //Temporary variable
                    t = sp * h * cA - st * sA;
            
                //Calculate coordinates of Ascii Char
                var x = Math.floor(width / 2 + (width/2) * D * (cp * h * cB - t * sB));

                var y = Math.floor(height / 2 + (height/2) * D * (cp * h * sB + t * cB));

                //Calculate the index in the array
                var ind = x + width * y;
            
            //Calucate the ascii char index
            var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

            //Update ascii char and depth if conditions are met
            if(y < height && y >= 0 && x>= 0 && x < width && D > hold[ind]){
                hold[ind] = D;
                //Update ascii char based on the index
                stay[ind] = '.,-~:;=!*#$A'[N > 0 ? N : 0];
            }

            }
        }

        //Update html element with the ascii frame
        preTag.innerHTML = stay.join('');
    }

    //Function to start the Animation
    function startAsciiAnimation() {
        //Start if byu calling renderAsciiAnimation every 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); // Render the initial ascii frame
    //Add event listener to start animation when page is loaded

    if(document.all){
        //For older versions of internet explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        //For modern browsers
        window.addEventListener('load', startAsciiAnimation,false);
    }

    //Add event listener to update ascii frame when window resized
    window.addEventListener('resize',renderAsciiFrame);
})();