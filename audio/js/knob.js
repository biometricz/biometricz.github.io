// --- Notes ---
// https://mir-s3-cdn-cf.behance.net/project_modules/disp/1dd3e221774089.56307491c7600.png
// https://www.surrealmachines.com/product/dub-machines-vstau/

// - To Do -
// Make components for the knobs
// Need to make two way knobs
// - for this i have to figure out how to have the svg break point in the middle of the arc

// - Vue Stuff -
var app = new Vue({
    el: '#app',
    data: {
        colorArray: ['#23CDE8','#23F376','#FFFB43','#FA9C34','#21CD92','#ED31A2','#E22'],
        effects: [
            { 
                id: 0,
                label: 'Панорама',
                knobs: [
                    {
                        label: 'Amount',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'Space',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'High Pass',
                        rotation: -132,
                        selected: false,
                    },
                ],
                active: true,
                selected: false,
                color: '#23F376',
                knobStyle: 1,
            },
            { 
                id: 1,
                label: 'Хор',
                knobs: [
                    {
                        label: 'Dry/Wet',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'Rate',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'Feedback',
                        rotation: -132,
                        selected: false,
                    },
                ],
                active: true,
                selected: false,
                color: '#ED31A2',
                knobStyle: 2,
            },
            { 
                id: 2,
                label: 'Задержка',
                knobs: [
                    {
                        label: 'Dry/Wet',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'Time',
                        rotation: -132,
                        selected: false,
                    },
                    {
                        label: 'Fine',
                        rotation: -132,
                        selected: false,
                    },
                ],
                active: true,
                selected: false,
                color: '#FA9C34',
                knobStyle: 3,
            },
        ],
        knobs: [
            {
                id: 0,
                label: 'Test Knob',
                rotation: -132,
                color: '#FA9C34',
                active: true,
                selected: false,
                style: 1
            },
            {
                id: 1,
                label: 'Test Knob 2',
                rotation: -132,
                color: '#21CD92',
                active: true,
                selected: false,
                style: 1
            },
            {
                id: 2,
                label: 'Test Knob 3',
                rotation: -132,
                color: '#ED31A2',
                active: true,
                selected: false,
                style: 3
            },
            {
                id: 3,
                label: 'Test Knob 4',
                rotation: -132,
                color: '#FFFB43',
                active: true,
                selected: false,
                style: 3
            },
            {
                id: 4,
                label: 'Test Knob 5',
                rotation: -132,
                color: '#23CDE8',
                active: true,
                selected: false,
                style: 2
            }, 
            {
                id: 5,
                label: 'Test Knob 6',
                rotation: -132,
                color: '#E22',
                active: true,
                selected: false,
                style: 2
            },
        ],
        currentY: 0,
        mousemoveFunction: function(e) {
            var selectedEffect = app.effects.filter(function(i){return i.selected === true;})[0];
            if(selectedEffect) {
                var selectedKnob = selectedEffect.knobs.filter(function(i){return i.selected === true;})[0];
            } else {
                var selectedKnob = app.knobs.filter(function(i){return i.selected === true;})[0];
            }
            if(selectedKnob) {
                // Knob Rotation
                if(e.pageY - app.currentY !== 0) { selectedKnob.rotation -= (e.pageY - app.currentY); }
                app.currentY = e.pageY;
                
                // Setting Max rotation
                if(selectedKnob.rotation >= 132) { selectedKnob.rotation = 132; } 
                else if(selectedKnob.rotation <= -132) { selectedKnob.rotation = -132; }
                
                // Knob method to update parameters based on the know rotation
                // selectedKnob.method(selectedKnob.rotation, selectedKnob.modifier);
            }
        },
    },
    //computed: {},
    methods: {
        unselectKnobs: function() {
            for(var i in this.knobs) { this.knobs[i].selected = false; }
            for(var i in this.effects) { 
                for(var j in this.effects[i].knobs) { this.effects[i].knobs[j].selected = false; }
                this.effects[i].selected = false; 
            }
        }
    }
});

window.addEventListener('mousemove', app.mousemoveFunction);
