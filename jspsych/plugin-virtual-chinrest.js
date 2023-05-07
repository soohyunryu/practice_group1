var jsPsychVirtualChinrest = function(e) {
    "use strict";
    const t = {
        name: "virtual-chinrest",
        parameters: {
            resize_units: {
                type: e.ParameterType.SELECT,
                pretty_name: "Resize units",
                options: ["none", "cm", "inch", "deg"],
                default: "none"
            },
            pixels_per_unit: {
                type: e.ParameterType.INT,
                pretty_name: "Pixels per unit",
                default: 100
            },
            adjustment_prompt: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Adjustment prompt",
                default: '\n          <div style="text-align: left;">\n          <p>Click and drag the lower right corner of the image until it is the same size as a credit card held up to the screen.</p>\n          <p>You can use any card that is the same size as a credit card, like a membership card or driver\'s license.</p>\n          <p>If you do not have access to a real card you can use a ruler to measure the image width to 3.37 inches or 85.6 mm.</p>\n          </div>'
            },
            adjustment_button_prompt: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Adjustment button prompt",
                default: "Click here when the image is the correct size"
            },
            item_path: {
                type: e.ParameterType.IMAGE,
                pretty_name: "Item path",
                default: "img/card.png",
                preload: !1
            },
            item_height_mm: {
                type: e.ParameterType.FLOAT,
                pretty_name: "Item height (mm)",
                default: 53.98
            },
            item_width_mm: {
                type: e.ParameterType.FLOAT,
                pretty_name: "Item width (mm)",
                default: 85.6
            },
            item_init_size: {
                type: e.ParameterType.INT,
                pretty_name: "Initial Size",
                default: 250
            },
            blindspot_reps: {
                type: e.ParameterType.INT,
                pretty_name: "Blindspot measurement repetitions",
                default: 5
            },
            blindspot_prompt: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Blindspot prompt",
                default: '\n          <p>Now we will quickly measure how far away you are sitting.</p>\n          <div style="text-align: left">\n            <ol>\n              <li>Put your left hand on the <b>space bar</b>.</li>\n              <li>Cover your right eye with your right hand.</li>\n              <li>Using your left eye, focus on the black square. Keep your focus on the black square.</li>\n              <li>The <span style="color: red; font-weight: bold;">red ball</span> will disappear as it moves from right to left. Press the space bar as soon as the ball disappears.</li>\n            </ol>\n          </div>\n          <p>Press the space bar when you are ready to begin.</p>\n          '
            },
            blindspot_measurements_prompt: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Blindspot measurements prompt",
                default: "Remaining measurements: "
            },
            viewing_distance_report: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Viewing distance report",
                default: "<p>Based on your responses, you are sitting about <span id='distance-estimate' style='font-weight: bold;'></span> from the screen.</p><p>Does that seem about right?</p>"
            },
            redo_measurement_button_label: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Re-do measurement button label",
                default: "No, that is not close. Try again."
            },
            blindspot_done_prompt: {
                type: e.ParameterType.HTML_STRING,
                pretty_name: "Blindspot done prompt",
                default: "Yes"
            }
        }
    };
    class n {
        constructor(e)
        {
            this.jsPsych = e
        }
        trial(e, t)
        {
            if (!(t.blindspot_reps > 0 || "deg" != t.resize_units && "degrees" != t.resize_units))
                return void console.error("Blindspot repetitions set to 0, so resizing to degrees of visual angle is not possible!");
            let n = {
                    item_width_mm: t.item_width_mm,
                    item_height_mm: t.item_height_mm
                },
                i = {
                    ball_pos: [],
                    slider_clck: !1
                },
                r = t.item_width_mm / t.item_height_mm;
            const s = r < 1 ? t.item_init_size : Math.round(t.item_init_size / r),
                a = r < 1 ? Math.round(t.item_init_size * r) : t.item_init_size,
                o = Math.round(.1 * a);
            let d = `\n        <div id="page-size">\n          <div id="item" style="border: none; height: ${s}px; width: ${a}px; margin: 5px auto; background-color: none; position: relative; background-image: url(${t.item_path}); background-size: 100% auto; background-repeat: no-repeat;">\n            <div id="jspsych-resize-handle" style="cursor: nwse-resize; background-color: none; width: ${o}px; height: ${o}px; border: 5px solid red; border-left: 0; border-top: 0; position: absolute; bottom: 0; right: 0;">\n            </div>\n          </div>\n          ${t.adjustment_prompt}\n          <button id="end_resize_phase" class="jspsych-btn">\n            ${t.adjustment_button_prompt}\n          </button>\n        </div>\n      `,
                p = `\n        <div id="blind-spot">\n          ${t.blindspot_prompt}\n          <div id="svgDiv" style="width:1000px;height:200px;"></div>\n          <button class="btn btn-primary" id="proceed" style="display:none;"> +\n            ${t.blindspot_done_prompt} +\n          </button>\n          ${t.blindspot_measurements_prompt} \n          <div id="click" style="display:inline; color: red"> ${t.blindspot_reps} </div>\n        </div>`,
                l = `\n        <div id="distance-report">\n          <div id="info-h">\n            ${t.viewing_distance_report}\n          </div>\n          <button id="redo_blindspot" class="jspsych-btn">${t.redo_measurement_button_label}</button>\n          <button id="proceed" class="jspsych-btn">${t.blindspot_done_prompt}</button>\n        </div>\n      `;
            e.innerHTML = '<div id="content" style="width: 900px; margin: 0 auto;"></div>';
            const m = performance.now();
            function c() {
                const e = document.querySelector("#item").getBoundingClientRect().width;
                n.item_width_px = Math.round(e);
                const i = function(e) {
                    return e / n.item_width_mm
                }(e);
                n.px2mm = w(i, 2),
                t.blindspot_reps > 0 ? u() : y()
            }
            !function() {
                e.querySelector("#content").innerHTML = d;
                let t,
                    n,
                    i,
                    s,
                    a = !1;
                const o = e.querySelector("#item");
                document.addEventListener("mouseup", (function() {
                    a = !1
                })),
                e.querySelector("#jspsych-resize-handle").addEventListener("mousedown", (function(e) {
                    e.preventDefault(),
                    a = !0,
                    t = e.pageX,
                    n = e.pageY,
                    i = parseInt(o.style.width),
                    s = parseInt(o.style.height)
                    console.error(t,n,i,s);
                })),
                e.addEventListener("mousemove", (function(e) {
                    if (a) {
                        let a = e.pageX - t,
                            d = e.pageY - n;
                        Math.abs(a) >= Math.abs(d) ? (o.style.width = Math.round(Math.max(20, i + 2 * a)) + "px", o.style.height = Math.round(Math.max(20, i + 2 * a) / r) + "px") : (o.style.height = Math.round(Math.max(20, s + 2 * d)) + "px", o.style.width = Math.round(r * Math.max(20, s + 2 * d)) + "px")
                    }
                })),
                e.querySelector("#end_resize_phase").addEventListener("click", c)
            }();
            //const u = () => {
            const u = () => {
                i = {
                        ball_pos: [],
                        slider_clck: !1
                    },
                    document.querySelector("#content").innerHTML = p,
                    function(e=180) {
                        var t = SVG("svgDiv");
                        const r = n.px2mm * e,
                            s = .6 * r;
                        var a = t.circle(30).move(s, 50).fill("#f00");
                        window.ball = a;
                        var o = t.rect(30, 30).move(Math.min(r - 50, 950), 50);
                        i.square_pos = w(o.cx(), 2),
                        i.rectX = r,
                        i.ballX = s
                    }(),
                    this.jsPsych.pluginAPI.getKeyboardResponse({
                        callback_function: h,
                        valid_responses: [" "],
                        rt_method: "performance",
                        allow_held_key: !1,
                        persist: !1
                    })
                    
                },
                h = () => {
                    this.jsPsych.pluginAPI.getKeyboardResponse({
                        callback_function: g,
                        valid_responses: [" "],
                        rt_method: "performance",
                        allow_held_key: !1,
                        persist: !0
                    }),
                    b()
                },
                _ = () => {
                    window.ball.stop(),
                    this.jsPsych.pluginAPI.cancelAllKeyboardResponses(),
                    "none" != t.viewing_distance_report ? y() : (e.querySelector("#content").innerHTML = l, e.querySelector("#distance-estimate").innerHTML = `\n          ${Math.round(n.view_dist_mm / 10)} cm (${Math.round(.0393701 * n.view_dist_mm)} inches)\n        `, e.querySelector("#redo_blindspot").addEventListener("click", u), e.querySelector("#proceed").addEventListener("click", y))
                    //"none" == t.viewing_distance_report ? y() : (e.querySelector("#content").innerHTML = l, e.querySelector("#distance-estimate").innerHTML = `\n          ${Math.round(n.view_dist_mm / 10)} cm (${Math.round(.0393701 * n.view_dist_mm)} inches)\n        `, e.querySelector("#proceed").addEventListener("click", y))
                };
            const y = () => {
                n.rt = Math.round(performance.now() - m),
                this.jsPsych.pluginAPI.cancelAllKeyboardResponses(),
                function() {
                    n.item_width_deg = 2 * Math.atan(n.item_width_mm / 2 / n.view_dist_mm) * 180 / Math.PI,
                    n.px2deg = n.item_width_px / n.item_width_deg;
                    let e = 0;
                    switch (t.resize_units) {
                    case "cm":
                    case "centimeters":
                        e = 10 * n.px2mm;
                        break;
                    case "inch":
                    case "inches":
                        e = 25.4 * n.px2mm;
                        break;
                    case "deg":
                    case "degrees":
                        e = n.px2deg
                    }
                    if (e > 0) {
                        let i = e / t.pixels_per_unit;
                        document.getElementById("jspsych-content").style.transform = "scale(" + i + ")",
                        n.px2deg = n.px2deg / i,
                        n.px2mm = n.px2mm / i,
                        n.item_width_px = n.item_width_px / i,
                        n.scale_factor = i
                    }
                    t.blindspot_reps > 0 ? (n.win_width_deg = window.innerWidth / n.px2deg, n.win_height_deg = window.innerHeight / n.px2deg) : (delete n.px2deg, delete n.item_width_deg)
                }(),
                e.innerHTML = "",
                this.jsPsych.finishTrial(n)
            };
            function b() {
                window.ball.animate(7e3).during((function(e) {
                    let t = -e * i.ballX;
                    window.moveX = t;
                    window.ball.attr({
                        transform: "translate(" + t + ",0)"
                    })
                })).loop(!0, !1).after((function() {
                    b()
                }))
            }
            function g() {
                i.ball_pos.push(w(window.ball.cx() + window.moveX, 2));
                var e = i.ball_pos.reduce(((e, t) => e + t), 0),
                    t = i.ball_pos.length;
                i.avg_ball_pos = w(e / t, 2);
                var r = (i.square_pos - i.avg_ball_pos) / n.px2mm / Math.tan(v(13.5));
                n.view_dist_mm = w(r, 2);
                var s = Number(document.querySelector("#click").textContent);
                s -= 1,
                document.querySelector("#click").textContent = Math.max(s, 0).toString(),
                s <= 0 ? _() : (window.ball.stop(), b())
            }
            function w(e, t) {
                return Number(Math.round(Number(e + "e" + t)) + "e-" + t)
            }
            const v = e => e * Math.PI / 180
        }
    }
    return n.info = t, n
}(jsPsychModule);
//# sourceMappingURL=index.browser.min.js.map