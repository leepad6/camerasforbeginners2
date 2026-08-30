(function ($) {
    "use strict";
    
    // Initiate the wowjs animation library
    new WOW().init();

    // Initiate nav menu
    $('.menu, .overlay').click(function () {
        $('.menu').toggleClass('clicked');
        $('#nav').toggleClass('show');
    });

    // Close nav menu automatically when a link is clicked (For Swup compatibility)
    $(document).on('click', '#nav a', function() {
        $('.menu').removeClass('clicked');
        $('#nav').removeClass('show');
        $('.overlay').removeClass('show');
    });
    
    // Portfolio modal slider (Protected: Only run if slick is loaded)
    if ($.fn.slick) {
        $('.port-slider').slick({
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.port-slider-nav'
        });
        $('.port-slider-nav').slick({
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.port-slider',
            arrows: false,
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });
    }
    
    $('#popover-content-download').hide();
    $("[data-toggle=popover]").each(function (e) {
        $(this).popover({
            html: true,
            content: function () {
                var id = $(this).attr('id')
                return $('#popover-content-' + id).html();
            }
        });
    });
	
	// Date and time picker of booking section (Protected: Only run if datetimepicker is loaded)
    if ($.fn.datetimepicker) {
        $('#date-1, #date-2').datetimepicker({
            format: 'L'
        });
        $('#time-1, #time-2').datetimepicker({
            format: 'LT'
        });
    }

    // ==========================================
    // UNIFIED DYNAMIC IMAGE MODAL SETUP
    // ==========================================
    $(document).ready(function() {
        // Fallback: Only inject the HTML structure if it's missing from the page.
        if ($('#imageModal').length === 0) {
            $('body').append(`
                <div id="imageModal" class="img-modal">
                    <span class="img-modal-close">&times;</span>
                    <img class="img-modal-content" id="expandedImg">
                </div>
            `);
        }
    });

    document.addEventListener('click', function(e) {
        var modal = document.getElementById("imageModal");
        var modalImg = document.getElementById("expandedImg");
        
        if (!modal || !modalImg) return; 

        // Open Modal: Now checks for BOTH 'img-modal-trigger' AND 'clickable-image'
        if (e.target && (e.target.classList.contains('img-modal-trigger') || e.target.classList.contains('clickable-image'))) {
            e.preventDefault();
            // Force flex layout instead of block via inline styles to ensure centering
            modal.style.display = "flex"; 
            
            // --- NEW: Lock the scroll wheel ---
            document.body.style.overflow = "hidden";
            
            setTimeout(function() { modal.classList.add('show'); }, 10);
            modalImg.src = e.target.src;
        }
        
        // Close modal when clicking on the dark background, the image itself, OR the X button
        if (e.target && (e.target.classList.contains('img-modal') || e.target.classList.contains('img-modal-content') || e.target.classList.contains('img-modal-close'))) {
            modal.classList.remove('show');
            
            // --- NEW: Unlock the scroll wheel ---
            document.body.style.overflow = "";
            
            setTimeout(function() { modal.style.display = "none"; }, 300);
        }
    });

    // ==========================================
    // Back to Top Button Setup
    // ==========================================
    $(document).ready(function() {
        if ($('.back-to-top').length === 0) {
            $('head').append(`
                <style>
                    .back-to-top {
                        position: fixed; display: none; background: #ffffff; color: #0c0c0c;
                        width: 45px; height: 45px; text-align: center; line-height: 45px;
                        font-size: 20px; border-radius: 50%; right: 20px; bottom: 20px;
                        z-index: 99; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    }
                    .back-to-top:hover { background: #a8a8a8; color: #ffffff; }
                </style>
            `);
            $('body').append('<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>');
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow'); 
        } else {
            $('.back-to-top').fadeOut('slow'); 
        }
    });

    $(document).on('click', '.back-to-top', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // Camera Type Page: Sensor Crop Simulator
    // ==========================================
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'sensor-selector') {
            var sensor = e.target.value;
            var overlayBox = document.getElementById('sensor-overlay-box');
            var overlayLabel = document.getElementById('sensor-overlay-label');
            
            if (!overlayBox || !overlayLabel) return;

            if(sensor === 'mediumformat') {
                overlayBox.style.width = '100%'; overlayBox.style.height = '100%'; overlayLabel.innerText = 'Medium Format';
            } else if(sensor === 'fullframe') {
                overlayBox.style.width = '81%'; overlayBox.style.height = '72%'; overlayLabel.innerText = 'Full Frame';
            } else if (sensor === 'apsc') {
                overlayBox.style.width = '53%'; overlayBox.style.height = '47%'; overlayLabel.innerText = 'APS-C';
            } else if (sensor === 'm43') {
                overlayBox.style.width = '39%'; overlayBox.style.height = '39%'; overlayLabel.innerText = 'Micro 4/3';
            } else if (sensor === '1inch') {
                overlayBox.style.width = '30%'; overlayBox.style.height = '26%'; overlayLabel.innerText = '1-Inch';
            }
        }
    });

    $(document).on('shown.bs.collapse', '#brandAccordion .collapse', function (e) {
        var targetOffset = $(e.target).offset().top - 100;
        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    });

    // ==========================================
    // Camera Guide Page: Quiz Logic (Global)
    // ==========================================
    window.quizQuestions = [
        {
            question: "งบประมาณสำหรับการซื้อกล้องของคุณอยู่ในช่วงใด?",
            options: [
                { text: "ต่ำกว่า 20,000 บาท (ระดับเริ่มต้น / เน้นประหยัด)", value: 0.625 },
                { text: "20,000 - 60,000 บาท (ระดับกลาง / เริ่มจริงจัง)", value: 1.25 },
                { text: "60,000 - 150,000 บาท (ระดับสูง / มืออาชีพ)", value: 2.5 },
                { text: "มากกว่า 150,000 บาท (ระดับสูงสุด / งานโปรดักชั่น)", value: 5.0 }
            ]
        },
        {
            question: "คุณต้องการให้กล้องมีน้ำหนักและขนาดอย่างไร?",
            options: [
                { text: "เบามากที่สุด พกพาสะดวก เหมาะสำหรับการเดินทางลุยๆ", value: 0.625 },
                { text: "ใส่กระเป๋าเสื้อได้ หยิบจับใช้งานรวดเร็ว ไม่เป็นภาระ", value: 1.25 },
                { text: "น้ำหนักปานกลาง จับถนัดมือ มีความสมดุลเวลาติดเลนส์ใหญ่", value: 2.5 },
                { text: "ยอมรับน้ำหนักมากได้ ไม่สนใจขนาด ขอให้ได้คุณภาพไฟล์ดีที่สุด", value: 5.0 }
            ]
        },
        {
            question: "คุณตั้งใจจะถ่ายภาพประเภทใดเป็นหลัก?",
            options: [
                { text: "กีฬาเอ็กซ์ตรีม, แอคชั่น, ใต้น้ำ และ VLOG (ต้องการความสมบุกสมบัน)", value: 0.625 },
                { text: "ท่องเที่ยวทั่วไป, ถ่ายภาพถนน (Street) และภาพชีวิตประจำวัน", value: 1.25 },
                { text: "ถ่ายภาพรับปริญญา, งานอีเวนต์, ทิวทัศน์ (ชอบการมองผ่านช่องมองภาพ)", value: 2.5 },
                { text: "ภาพพอร์เทรตสตูดิโอ, งานพาณิชย์ และวิดีโอระดับภาพยนตร์สั้น", value: 5.0 }
            ]
        },
        {
            question: "คุณคาดว่าจะหยิบกล้องมาใช้งานบ่อยแค่ไหน?",
            options: [
                { text: "นานๆ ครั้ง เฉพาะช่วงไปเที่ยวทริปพิเศษหรือวันหยุดยาว", value: 0.625 },
                { text: "สัปดาห์ละ 1-2 ครั้ง พกติดตัวไปคาเฟ่หรือเป็นงานอดิเรก", value: 1.25 },
                { text: "ทุกวัน หรือรับงานถ่ายภาพเป็นรายได้เสริม", value: 2.5 },
                { text: "ใช้งานหนักเต็มเวลาในฐานะเครื่องมือประกอบอาชีพ", value: 5.0 }
            ]
        },
        {
            question: "ระดับความรู้และทักษะการถ่ายภาพของคุณอยู่ในระดับใด?",
            options: [
                { text: "มือใหม่ เน้นโหมดอัตโนมัติ (Auto) ยังไม่เข้าใจการตั้งค่าต่างๆ", value: 0.625 },
                { text: "ระดับพื้นฐาน จัดองค์ประกอบเป็น แต่ยังพึ่งพาระบบของกล้องช่วย", value: 1.25 },
                { text: "ระดับกลาง เข้าใจ Aperture, Shutter Speed และ ISO ปรับแต่งเองได้", value: 2.5 },
                { text: "มืออาชีพ ใช้โหมด Manual ได้คล่องแคล่ว ควบคุมทุกพารามิเตอร์ได้ 100%", value: 5.0 }
            ]
        },
        {
            question: "คุณให้ความสำคัญกับอายุการใช้งานของ 'แบตเตอรี่' มากแค่ไหน?",
            options: [
                { text: "ไม่ซีเรียส แบตหมดไวก็ชาร์จผ่าน Power Bank ระหว่างทางได้", value: 0.625 },
                { text: "ปานกลาง ถ่ายรูปทั่วไป แบตอยู่ได้ครึ่งวันก็พอรับได้", value: 1.25 },
                { text: "สำคัญมาก! ต้องถ่ายได้ทั้งวัน กดได้เป็นพันๆ ช็อตโดยไม่ต้องเปลี่ยนแบต", value: 2.5 },
                { text: "ยอมรับเรื่องกินแบตได้ แลกมากับหน้าจอ EVF และระบบโฟกัสล้ำสมัย", value: 5.0 }
            ]
        },
        {
            question: "คุณต้องการความละเอียดของภาพ (Resolution) ในระดับใด?",
            options: [
                { text: "เน้นแค่อัปโหลดลงโซเชียลมีเดีย (Facebook/IG) ไม่ต้องการไฟล์ใหญ่", value: 0.625 },
                { text: "20-24 MP เพียงพอ ถ่ายสวยคมชัดกว่ามือถือ ส่งไฟล์แชร์ได้รวดเร็ว", value: 1.25 },
                { text: "24-30 MP ไฟล์มีความยืดหยุ่น นำไปแต่งต่อใน Lightroom ได้ลึก", value: 2.5 },
                { text: "40-100 MP ขึ้นไป สำหรับงานพิมพ์ขนาดยักษ์และการครอปภาพระดับโปร", value: 5.0 }
            ]
        },
        {
            question: "คุณวางแผนจะลงทุนกับ 'เลนส์' ในระยะยาวอย่างไร?",
            options: [
                { text: "ไม่ต้องการซื้ออะไรเพิ่ม จบในตัวเดียว พร้อมเมาท์ติดหมวก/ไม้เซลฟี่", value: 0.625 },
                { text: "เน้นกล้องตัวเดียวจบ เลนส์ติดกล้องมาเลย ไม่ต้องถอดเปลี่ยนให้ยุ่งยาก", value: 1.25 },
                { text: "ต้องการระบบที่มีเลนส์ให้เลือกเยอะ ราคาถูก และหาซื้อเลนส์มือสองได้ง่าย", value: 2.5 },
                { text: "งบไม่จำกัด ยินดีลงทุนกับระบบเลนส์ยุคใหม่คุณภาพสูงสุดเพื่ออนาคต", value: 5.0 }
            ]
        }
    ];

    window.currentQuestionIndex = 0;
    window.totalScore = 0;

    window.startQuiz = function() {
        window.currentQuestionIndex = 0;
        window.totalScore = 0;
        
        var startDiv = document.getElementById('quiz-start');
        var qDiv = document.getElementById('quiz-question');
        
        if (startDiv) startDiv.style.display = 'none';
        if (qDiv) {
            qDiv.style.display = 'block';
            qDiv.className = 'quiz-step quiz-fade-in';
        }
        
        window.renderQuestion(0);
    };

    window.renderQuestion = function(index) {
        var q = window.quizQuestions[index];
        var counter = document.getElementById('question-counter');
        var text = document.getElementById('question-text');
        var bar = document.getElementById('quiz-progress-bar');
        var optionsContainer = document.getElementById('options-container');

        if (!q || !counter || !text) return;

        counter.innerText = 'คำถามที่ ' + (index + 1) + ' จาก ' + window.quizQuestions.length;
        text.innerText = q.question;
        
        if (bar) {
            var progressPercent = ((index + 1) / window.quizQuestions.length) * 100;
            bar.style.width = progressPercent + '%';
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            q.options.forEach(function(opt) {
                var btn = document.createElement('button');
                btn.className = 'quiz-option-btn mb-3';
                btn.innerHTML = '<i class="fa fa-circle-o mr-3" style="color: #79E8E4;"></i> ' + opt.text;
                btn.onclick = function() { window.selectOption(opt.value); };
                optionsContainer.appendChild(btn);
            });
        }
    };

    window.selectOption = function(value) {
        window.totalScore += value;
        window.currentQuestionIndex++;
        
        var qDiv = document.getElementById('quiz-question');
        if (!qDiv) return;
        
        if (window.currentQuestionIndex < window.quizQuestions.length) {
            qDiv.classList.remove('slide-in-right', 'quiz-fade-in');
            qDiv.classList.add('slide-out-left');
            
            setTimeout(function() {
                window.renderQuestion(window.currentQuestionIndex);
                qDiv.classList.remove('slide-out-left');
                qDiv.classList.add('slide-in-right');
            }, 400); 
        } else {
            qDiv.classList.remove('slide-in-right', 'quiz-fade-in');
            qDiv.classList.add('slide-out-left');
            
            setTimeout(function() {
                window.calculateResult();
            }, 400);
        }
    };

    window.calculateResult = function() {
        var qDiv = document.getElementById('quiz-question');
        var resDiv = document.getElementById('quiz-result');
        var bar = document.getElementById('quiz-progress-bar');

        if (qDiv) qDiv.style.display = 'none';
        if (bar) bar.style.width = '100%';
        if (resDiv) {
            resDiv.style.display = 'block';
            resDiv.classList.remove('slide-out-left');
            resDiv.classList.add('quiz-fade-in');
        }

        var maxPossibleScore = 40; 
        var percentage = (window.totalScore / maxPossibleScore) * 100;
        
        var resultTitle = '';
        var resultDesc = '';
        var resultImg = '';
        var resultLink = '';
        
        if (percentage <= 25) {
            resultTitle = 'Action Camera';
            resultDesc = 'คุณเป็นสายลุยตัวจริง! ชอบความตื่นเต้น กีฬาผจญภัย หรือการท่องเที่ยวที่ต้องพกพากล้องไปในสภาพแวดล้อมที่สมบุกสมบัน Action Camera ตอบโจทย์ความเล็ก เบา ทนทาน และกันน้ำได้ดีที่สุดสำหรับคุณ';
            resultImg = 'img/type/camera/action-camera.jpg'; 
            resultLink = 'action.html'; 
        } else if (percentage <= 50) {
            resultTitle = 'Point and Shoot (Compact)';
            resultDesc = 'คุณชอบความเรียบง่ายและสะดวกสบาย! เน้นพกพาง่าย ถ่ายสนุก ไม่ต้องคิดเรื่องการปรับตั้งค่าหรือเปลี่ยนเลนส์ให้วุ่นวาย กล้องคอมแพคระดับพรีเมียมคือคำตอบที่ใช่สำหรับไลฟ์สไตล์แบบชิลๆ ของคุณที่สุด';
            resultImg = 'img/type/camera/point-and-shoot.jpg';
            resultLink = 'POS.html'; 
        } else if (percentage <= 75) {
            resultTitle = 'DSLR Camera';
            resultDesc = 'คุณหลงใหลในเสน่ห์ของการถ่ายภาพแบบคลาสสิกและทรงพลัง! ชื่นชอบการมองผ่านช่องมองภาพแบบออปติคอล (OVF) ต้องการแบตเตอรี่ที่อึดทนทาน และระบบเลนส์มือสองที่มีให้เลือกมากมายในราคาที่คุ้มค่า';
            resultImg = 'img/type/camera/dslr.jpg';
            resultLink = 'DSLR.html'; 
        } else {
            resultTitle = 'Mirrorless Camera';
            resultDesc = 'คุณคือผู้ที่มองหาเทคโนโลยีขั้นสุด! ต้องการคุณภาพไฟล์ที่ยอดเยี่ยม ระบบโฟกัสติดตามดวงตาที่แม่นยำรวดเร็ว และรองรับงานวิดีโอระดับมืออาชีพ ในระบบกล้องแห่งอนาคตที่ตอบโจทย์งานได้ครอบจักรวาล';
            resultImg = 'img/type/camera/mirrorless.jpg';
            resultLink = 'Mirrorless.html'; 
        }
        
        var elTitle = document.getElementById('result-title');
        var elScore = document.getElementById('result-score');
        var elDesc = document.getElementById('result-desc');
        var elLink = document.getElementById('result-link');
        var elImgCont = document.getElementById('result-image-container');

        if (elTitle) elTitle.innerText = resultTitle;
        if (elScore) elScore.innerText = 'ความตรงกับไลฟ์สไตล์: ' + percentage.toFixed(1) + '%';
        if (elDesc) elDesc.innerText = resultDesc;
        if (elLink) elLink.href = resultLink;
        
        if (elImgCont) {
            elImgCont.innerHTML = '<div style="width: 100%; max-width: 450px; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); background: rgba(0,0,0,0.2); padding: 15px; display: flex; align-items: center; justify-content: center;">' +
                '<img src="' + resultImg + '" alt="' + resultTitle + '" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;" onerror="this.onerror=null; this.src=\'https://placehold.co/800x450/222222/79E8E4?text=' + resultTitle.replace(/ /g, '+') + '\';">' +
            '</div>';
        }
    };

    window.restartQuiz = function() {
        window.currentQuestionIndex = 0;
        window.totalScore = 0;
        
        var resDiv = document.getElementById('quiz-result');
        var startDiv = document.getElementById('quiz-start');
        var bar = document.getElementById('quiz-progress-bar');
        
        if (resDiv) {
            resDiv.style.display = 'none';
            resDiv.classList.remove('quiz-fade-in');
        }
        if (startDiv) {
            startDiv.style.display = 'block';
            startDiv.classList.add('quiz-fade-in');
        }
        if (bar) bar.style.width = '0%';
    };

    // Handles auto-scroll for both Brand and Component accordions
    $(document).on('shown.bs.collapse', '#brandAccordion .collapse, #componentAccordion .collapse', function (e) {
        var targetOffset = $(e.target).offset().top - 100;
        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    });

    // Add your history.html accordion logic here:
    $(document).on('shown.bs.collapse', '#mediaAccordion .collapse', function (e) {
        var contentDiv = $(e.target).find('> div');
        var targetOffset;

        if(contentDiv.length > 0) {
             targetOffset = contentDiv.offset().top - 100;
        } else {
             targetOffset = $(e.target).offset().top - 100;
        }
        
        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });
    });

})(jQuery);