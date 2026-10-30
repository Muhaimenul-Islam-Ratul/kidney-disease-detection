document.addEventListener('DOMContentLoaded', () => {
    // Current Language State ('en' default)
    let currentLang = 'en';

    // Comprehensive Bilingual Dictionary for UI
    const dictionary = {
        bn: {
            appName: "বাংলাদেশ কিডনি কেয়ার পোর্টাল",
            appTagline: "ডিজিটাল নেফ্রোলজি সিটি স্ক্যান ডায়াগনস্টিক কেন্দ্র",
            systemStatus: "ডায়াগনস্টিক সিস্টেম প্রস্তুত",
            helpline16263: "২৪/৭ জাতীয় স্বাস্থ্য সেবা হটলাইন (16263)",
            helpline333: "জাতীয় তথ্য ও পরামর্শ কেন্দ্র (333)",
            patientInfoTitle: "রোগীর তথ্য (Patient Profile)",
            lblPatientName: "রোগীর নাম",
            lblPatientAge: "বয়স",
            lblPatientGender: "লিঙ্গ",
            lblRegNo: "রোগীর আইডি",
            optMale: "পুরুষ (Male)",
            optFemale: "নারী (Female)",
            uploadCardTitle: "সিটি স্ক্যান আপলোড (CT Scan Image)",
            dropzoneMain: "সিটি স্ক্যান ছবি টেনে এনে ছাড়ুন অথবা নির্বাচন করুন",
            dropzoneSub: "সমর্থিত ফরম্যাট: উচ্চ রেজুলেশন JPG, PNG বা DICOM",
            btnSelectFile: "স্ক্যান নির্বাচন করুন",
            btnRunAnalysis: "ডায়াগনস্টিক পরীক্ষা শুরু করুন",
            tipsTitle: "রোগীদের কিডনি সুরক্ষার টিপস",
            tip1: "• প্রতিদিন অন্তত ২.৫ থেকে ৩ লিটার বিশুদ্ধ পানি পান করুন।",
            tip2: "• খাবারে কাঁচা লবণ ও অতিরিক্ত সোডিয়াম খাওয়া পরিহার করুন।",
            tip3: "• চিকিৎসকের পরামর্শ ছাড়া ব্যথানাশক (Painkiller) খাবেন না।",
            tip4: "• নিয়মিত রক্তে ক্রিয়েটিনিন (Serum Creatinine) পরীক্ষা করান।",
            patientProfileSummaryTitle: "রোগীর প্রোফাইল বিবরণ",
            reportTitle: "ডায়াগনস্টিক প্যাথলজি রিপোর্ট",
            welcomeTitle: "সিটি স্ক্যান ছবি আপলোডের অপেক্ষায়",
            welcomeSub: "বাম পাশের প্যানেল থেকে রোগীর তথ্য পূরণ করে সিটি স্ক্যান ছবি আপলোড করুন এবং \"ডায়াগনস্টিক পরীক্ষা শুরু করুন\" বোতাম চাপুন।",
            loadingTitle: "উচ্চমাত্রার সিটি স্ক্যান পাইপলাইন সক্রিয়",
            loadingDefaultStatus: "স্ক্যান ডাটা প্রক্রিয়াকরণ ও টিস্যু বৈশিষ্ট্য পরীক্ষা চলছে...",
            lsp1Text: "ইমেজ নরমালাইজেশন ও নয়েজ ফিল্টারিং",
            lsp2Text: "প্যাথলজি টিস্যু বৈশিষ্ট্য মূল্যায়ন",
            lsp3Text: "ভলিউমেট্রিক অঞ্চল সেগমেন্টেশন",
            lblPName: "রোগীর নাম:",
            lblPAge: "বয়স ও লিঙ্গ:",
            unitYears: "বছর",
            lblPReg: "রোগীর আইডি:",
            lblPDate: "পরীক্ষার তারিখ:",
            primaryResultLabel: "প্রাথমিক ফলাফল (Primary Diagnostic Finding)",
            confLabel: "নির্ভুলতার হার",
            adviceTitle: "রোগীর জন্য সহজ ব্যাখ্যা ও চিকিৎসা নির্দেশিকা",
            adviceSub: "ফলাফল সহজে বোঝার জন্য নির্দেশিকা",
            recommendedStepsTitle: "📋 পরবর্তী জরুরি পদক্ষেপ:",
            scanVisualTitle: "সিটি স্ক্যান ভিজ্যুয়াল অ্যানালাইসিস (High-Resolution View)",
            tabOrig: "মূল স্ক্যান (Original Scan)",
            tabDet: "অবস্থান চিহ্নিতকরণ (Anomaly Localization)",
            tabSeg: "টিস্যু সেগমেন্টেশন ম্যাপ (Segmentation Map)",
            legendTitle: "কালার গাইড:",
            legCyst: "কিস্ট (Cyst)",
            legStone: "পাথর (Stone)",
            legTumor: "টিউমার (Tumor)",
            probTitle: "প্যাথলজি নির্ণয় হার (Classification Confidence)",
            segStatsTitle: "আক্রান্ত টিস্যু এলাকার পরিমাপ (% Area)",
            lblCystArea: "কিস্ট (Cyst) এলাকা:",
            lblStoneArea: "পাথর (Stone) এলাকা:",
            lblTumorArea: "টিউমার (Tumor) এলাকা:",
            contactTitle: "🏥 জরুরি ডাক্তার সহায়তা",
            contactDesc: "বাংলাদেশে যেকোনো স্থানে ২৪ ঘণ্টা ডাক্তারি পরামর্শের জন্য ১৬২৬ ৩ নম্বরে কল করুন।",
            btnCallHotline: "📞 ১৬২৬৩ কল দিন",
            btnPrintReport: "রিপোর্ট প্রিন্ট / ডাউনলোড করুন",
            btnReset: "নতুন স্ক্যান পরীক্ষা করুন",
            footerCopy: "© ২০২৬ বাংলাদেশ কিডনি কেয়ার পোর্টাল",
            footerDisclaimer: "⚠️ প্রাথমিক ডায়াগনস্টিক পোর্টাল • অনুমোদিত নেফ্রোলজি মূল্যায়ন"
        },
        en: {
            appName: "Bangladesh Kidney Care Portal",
            appTagline: "Digital Nephrology CT Diagnostic & Health Center",
            systemStatus: "Diagnostic System Ready",
            helpline16263: "24/7 National Health Hotline (16263)",
            helpline333: "National Information Center (333)",
            patientInfoTitle: "Patient Profile Information",
            lblPatientName: "Patient Name",
            lblPatientAge: "Age",
            lblPatientGender: "Gender",
            lblRegNo: "Patient ID",
            optMale: "Male",
            optFemale: "Female",
            uploadCardTitle: "Abdominal CT Scan Upload",
            dropzoneMain: "Drag & drop CT scan image here or click to select",
            dropzoneSub: "Supported Formats: High-resolution JPG, PNG or DICOM",
            btnSelectFile: "Select Scan File",
            btnRunAnalysis: "Run Diagnostic Analysis",
            tipsTitle: "Kidney Health Maintenance Tips",
            tip1: "• Drink 2.5 to 3 Liters of safe, clean water daily.",
            tip2: "• Limit dietary salt and excess sodium intake.",
            tip3: "• Avoid taking painkiller medications without medical advice.",
            tip4: "• Test your Serum Creatinine level regularly.",
            patientProfileSummaryTitle: "Patient Profile Summary",
            reportTitle: "Clinical Diagnostic Pathology Report",
            welcomeTitle: "Awaiting CT Scan Image",
            welcomeSub: "Please select or drop a CT scan image on the left panel to begin diagnostic evaluation.",
            loadingTitle: "High-Precision CT Scanner Pipeline Active",
            loadingDefaultStatus: "Processing scan matrix & computing volumetric tissue features...",
            lsp1Text: "Image Normalization & Denoising",
            lsp2Text: "Pathology Feature Assessment",
            lsp3Text: "Volumetric Area Segmentation",
            lblPName: "Patient Name:",
            lblPAge: "Age & Gender:",
            unitYears: "Yrs",
            lblPReg: "Patient ID:",
            lblPDate: "Exam Date:",
            primaryResultLabel: "Primary Diagnostic Finding",
            confLabel: "Diagnostic Accuracy",
            adviceTitle: "Patient Diagnostic Explanation & Advice",
            adviceSub: "Clear breakdown for understanding medical findings",
            recommendedStepsTitle: "📋 Recommended Action Steps:",
            scanVisualTitle: "CT Scan Visual Analysis (High-Resolution View)",
            tabOrig: "Original Scan",
            tabDet: "Anomaly Localization",
            tabSeg: "Tissue Segmentation Map",
            legendTitle: "Color Key:",
            legCyst: "Cyst Region",
            legStone: "Stone Region",
            legTumor: "Tumor Region",
            probTitle: "Pathology Classification Confidence",
            segStatsTitle: "Affected Region Measurement (% Area)",
            lblCystArea: "Cyst Region Area:",
            lblStoneArea: "Stone Region Area:",
            lblTumorArea: "Tumor Region Area:",
            contactTitle: "🏥 Emergency Doctor Assistance",
            contactDesc: "Call 16263 anytime for 24/7 medical consultation in Bangladesh.",
            btnCallHotline: "📞 Call 16263 Hotline",
            btnPrintReport: "Print / Save Medical Report",
            btnReset: "Examine New CT Scan",
            footerCopy: "© 2026 Bangladesh Kidney Care Portal",
            footerDisclaimer: "⚠️ Clinical Diagnostic Portal • Authorized Nephrology Evaluation"
        }
    };

    // Pathology Medical Details & Guidance Mapping (Bilingual)
    const pathologyGuide = {
        Normal: {
            bn: {
                title: "স্বাভাবিক কিডনি গঠন (Normal Renal Structure)",
                riskText: "স্বাভাবিক ও সুস্থ (Healthy)",
                riskClass: "normal",
                desc: "স্ক্যান পর্যবেক্ষণে কিডনির ঘনত্ব ও গঠন সম্পূর্ণ স্বাভাবিক পাওয়া গেছে। এতে কোনো কিস্ট, পাথর বা টিউমারের আলামত পাওয়া যায়নি।",
                explanation: "<strong>সুসংবাদ!</strong> আপনার সিটি স্ক্যান রিপোর্টে কিডনিতে কোনো রোগ বা অস্বাভাবিকতা দেখা যায়নি। আপনার কিডনি সুস্থভাবে কাজ করছে।",
                steps: [
                    "প্রতিদিন পর্যাপ্ত বিশুদ্ধ পানি পান করুন (দৈনিক ২.৫ - ৩ লিটার)।",
                    "কম সোডিয়ামযুক্ত সুষম খাদ্য গ্রহণ করুন।",
                    "প্রতি বছর একবার রুটিন চেকআপ করান।"
                ],
                doctorType: "বর্তমানে কোনো চিকিৎসার প্রয়োজন নেই। রুটিন পর্যবেক্ষণে থাকুন।"
            },
            en: {
                title: "Normal Renal Architecture",
                riskText: "Normal / Healthy Tissue",
                riskClass: "normal",
                desc: "CT scan evaluation confirms healthy renal parenchymal density with no evidence of fluid-filled cysts, calcified stones, or abnormal solid masses.",
                explanation: "<strong>Good News!</strong> The diagnostic analysis shows a healthy kidney with normal tissue density. No pathological abnormalities or structural lesions were detected.",
                steps: [
                    "Maintain adequate daily hydration (2.5 to 3 Liters of clean safe water).",
                    "Continue a healthy low-sodium diet and active lifestyle.",
                    "Schedule routine annual renal wellness checkups."
                ],
                doctorType: "No immediate medical intervention required. Continue routine health maintenance."
            }
        },
        Cyst: {
            bn: {
                title: "রেনাল কিস্ট সনাক্ত (Renal Cyst Identified)",
                riskText: "মাঝারি ঝুঁকি (Mild Attention Needed)",
                riskClass: "cyst",
                desc: "স্ক্যানে তরলপূর্ণ কিস্টের (Renal Cyst) উপস্থিতি সনাক্ত হয়েছে। সেগমেন্টেশন ম্যাপে কিস্টের সীমানা দেওয়া হয়েছে।",
                explanation: "<strong>কিস্ট কী?</strong> কিস্ট হলো কিডনিতে তরলভরা ছোট থলি। বেশিরভাগ কিস্ট ক্ষতিকর নয়, তবে আকারে বড় হলে ডাক্তারের পরামর্শ নেওয়া প্রয়োজন।",
                steps: [
                    "একজন <strong>নেফ্রোলজিস্ট (কিডনি বিশেষজ্ঞ)</strong> ডাক্তারের পরামর্শ নিন।",
                    "রক্তে ক্রিয়েটিনিন (Serum Creatinine) পরীক্ষা করান।",
                    "নির্দিষ্ট সময় পর আল্ট্রাসনোগ্রাম (USG) করে কিস্টের আকার পর্যবেক্ষণ করুন।"
                ],
                doctorType: "পরামর্শের জন্য নেফ্রোলজিস্ট (কিডনি বিশেষজ্ঞ) দেখান।"
            },
            en: {
                title: "Renal Cyst Pathology Identified",
                riskText: "Mild / Moderate Attention Needed",
                riskClass: "cyst",
                desc: "Scan analysis detects a fluid-filled renal cyst structure. Review the Tissue Segmentation Map for exact region coverage and boundaries.",
                explanation: "<strong>What is a Renal Cyst?</strong> A renal cyst is a fluid-filled sac formed on the kidney tissue. Most simple cysts are benign, but clinical monitoring ensures it does not enlarge or press on surrounding renal structures.",
                steps: [
                    "Schedule a consultation with a qualified <strong>Nephrologist (Kidney Specialist)</strong>.",
                    "Perform a standard Kidney Function Test (KFT - Serum Creatinine & Electrolytes).",
                    "Schedule a follow-up Renal Ultrasonography (USG) to monitor cyst dimensions over time."
                ],
                doctorType: "Recommended Specialist: Nephrologist (Kidney Specialist)"
            }
        },
        Stone: {
            bn: {
                title: "কিডনিতে পাথর সনাক্ত (Kidney Stone / Calculus)",
                riskText: "প্রয়োজনীয় চিকিৎসা প্রয়োজন (Moderate Risk)",
                riskClass: "stone",
                desc: "কিডনিতে খনিজ জমাট বাঁধা পাথরের উপস্থিতি সনাক্ত হয়েছে। অবস্থান চিহ্নিতকরণ ট্যাবে সুনির্দিষ্ট অবস্থান দেখা যাবে।",
                explanation: "<strong>পাথর কী?</strong> প্রস্রাবের খনিজ জমে কিডনিতে শক্ত পাথরের দানার মতো তৈরি হওয়া। এতে পিঠে/কোমরে তীব্র ব্যথা বা প্রস্রাবে জ্বালা হতে পারে।",
                steps: [
                    "একজন <strong>ইউরোলজিস্ট (ইউরোলজি বিশেষজ্ঞ)</strong> ডাক্তারের পরামর্শ নিন।",
                    "প্রচুর পানি পান করুন যাতে পাথর বের হতে সাহায্য হয়।",
                    "প্রস্রাবের ইনফেকশন (Urine R/E) পরীক্ষা করান।"
                ],
                doctorType: "পরামর্শের জন্য ইউরোলজিস্ট (ইউরোলজি বিশেষজ্ঞ) দেখান।"
            },
            en: {
                title: "Renal Calculus (Kidney Stone) Detected",
                riskText: "Moderate Clinical Attention Required",
                riskClass: "stone",
                desc: "High-density calcified mineral deposit localized inside the kidney. Review Anomaly Localization for exact spatial position.",
                explanation: "<strong>What is a Kidney Stone?</strong> Mineral salts and calcium that solidify into stone-like deposits inside the renal collecting system. It can cause flank discomfort, burning urination, or blockage if unmanaged.",
                steps: [
                    "Consult a qualified <strong>Urologist (Urinary Specialist)</strong> for clinical management options.",
                    "Increase daily water intake to support kidney filtration as advised by your doctor.",
                    "Perform a Routine Urine Examination (Urine R/E) and Renal Ultrasound."
                ],
                doctorType: "Recommended Specialist: Urologist (Urinary Specialist)"
            }
        },
        Tumor: {
            bn: {
                title: "কিডনি টিউমার চিহ্নিত (Renal Tumor Identified)",
                riskText: "জরুরি চিকিৎসা প্রয়োজন (High Priority Risk)",
                riskClass: "tumor",
                desc: "কিডনি টিস্যুতে মাংসপিণ্ড বা টিউমারের আলামত পাওয়া গেছে। দ্রুত বিশেষজ্ঞ ডাক্তার দিয়ে পরীক্ষা করান।",
                explanation: "<strong>টিউমার কী?</strong> কিডনিতে অস্বাভাবিক কোষ বৃদ্ধি পেয়ে মাংসপিণ্ড তৈরি হওয়া। দ্রুত সঠিক চিকিৎসায় এর নিরাময় সম্ভব।",
                steps: [
                    "<strong>জরুরি ভিত্তি:</strong> অভিজ্ঞ ইউরো-অনকোলজিস্ট বা নেফ্রোলজিস্ট ডাক্তারের নিকট যান।",
                    "কন্ট্রাস্ট এনহ্যান্সড সিটি স্ক্যান (CECT) করার প্রস্তুতি নিন।",
                    "পূর্বের সকল রিপোর্ট বিশেষজ্ঞ ডাক্তারের নিকট দেখান।"
                ],
                doctorType: "জরুরি ভিত্তিতে ইউরো-অনকোলজিস্ট বা নেফ্রোলজিস্ট দেখান।"
            },
            en: {
                title: "Renal Tumor Mass Identified",
                riskText: "High Priority Medical Concern",
                riskClass: "tumor",
                desc: "Scan findings indicate a solid tissue mass structure in the renal parenchyma. Prompt specialist radiologist and clinical assessment recommended.",
                explanation: "<strong>What is a Renal Tumor?</strong> An abnormal growth of tissue mass in the kidney parenchyma. Prompt clinical evaluation and specialist intervention are essential for optimal health management.",
                steps: [
                    "<strong>HIGH PRIORITY:</strong> Consult a Senior <strong>Urologist / Uro-Oncologist</strong> at a specialized kidney hospital immediately.",
                    "Prepare for Contrast-Enhanced CT (CECT) scan and histological verification as advised by your physician.",
                    "Bring all previous CT scans and medical records for expert medical review."
                ],
                doctorType: "URGENT CONSULTATION: Visit a Senior Urologist / Uro-Oncologist immediately"
            }
        }
    };

    // DOM Elements
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langText = document.getElementById('langText');

    const inputControlsSection = document.getElementById('inputControlsSection');
    const reportLeftSection = document.getElementById('reportLeftSection');

    const patientNameInput = document.getElementById('patientNameInput');
    const patientAgeInput = document.getElementById('patientAgeInput');
    const patientGenderInput = document.getElementById('patientGenderInput');
    const patientRegInput = document.getElementById('patientRegInput');
    
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImgBtn = document.getElementById('removeImgBtn');
    const runAnalysisBtn = document.getElementById('runAnalysisBtn');
    
    const stateWelcome = document.getElementById('stateWelcome');
    const stateLoading = document.getElementById('stateLoading');
    const stateReport = document.getElementById('stateReport');
    const loadingStatusText = document.getElementById('loadingStatusText');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPctReadout = document.getElementById('loadingPctReadout');
    
    const lsp1 = document.getElementById('lsp1');
    const lsp2 = document.getElementById('lsp2');
    const lsp3 = document.getElementById('lsp3');

    const diagnosisBanner = document.getElementById('diagnosisBanner');
    const diagnosisValue = document.getElementById('diagnosisValue');
    const diagnosisDesc = document.getElementById('diagnosisDesc');
    const diagnosisConf = document.getElementById('diagnosisConf');
    const riskBadge = document.getElementById('riskBadge');
    const riskText = document.getElementById('riskText');
    
    const adviceExplanation = document.getElementById('adviceExplanation');
    const adviceStepsList = document.getElementById('adviceStepsList');
    const doctorTypeText = document.getElementById('doctorTypeText');
    
    const outPatientName = document.getElementById('outPatientName');
    const outPatientAgeGender = document.getElementById('outPatientAgeGender');
    const outPatientReg = document.getElementById('outPatientReg');
    const outReportDate = document.getElementById('outReportDate');
    const reportDateText = document.getElementById('reportDateText');
    
    const imgOriginal = document.getElementById('imgOriginal');
    const imgDetection = document.getElementById('imgDetection');
    const imgSegmentation = document.getElementById('imgSegmentation');
    const segLegend = document.getElementById('segLegend');
    
    const probList = document.getElementById('probList');
    const statCystArea = document.getElementById('statCystArea');
    const statStoneArea = document.getElementById('statStoneArea');
    const statTumorArea = document.getElementById('statTumorArea');
    
    const printReportBtn = document.getElementById('printReportBtn');
    const resetBtn = document.getElementById('resetBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    let selectedFile = null;
    let currentReportData = null;

    // Date formatting
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    
    function updateDateLabel() {
        reportDateText.textContent = (currentLang === 'bn' ? 'তারিখ: ' : 'Date: ') + formattedDate;
    }
    updateDateLabel();

    // Interactive Language Switch Handler
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'bn' ? 'en' : 'bn';
        document.body.className = `lang-${currentLang}`;
        langText.textContent = currentLang === 'bn' ? 'English' : 'বাংলা';

        updateLanguageUI();
        if (currentReportData) {
            renderReport(currentReportData);
        }
    });

    function updateLanguageUI() {
        const langData = dictionary[currentLang];
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (langData[key]) {
                elem.textContent = langData[key];
            }
        });
        updateDateLabel();
    }

    // File selection handlers
    selectFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    dropzone.addEventListener('click', () => {
        if (!selectedFile) fileInput.click();
    });

    ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert(currentLang === 'bn' ? 'অনুগ্রহ করে ছবি (PNG, JPG) সিলেক্ট করুন।' : 'Please select an image file (PNG, JPG).');
            return;
        }
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'flex';
            dropzone.querySelector('.dropzone-content').style.display = 'none';
            runAnalysisBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearFileSelection();
    });

    function clearFileSelection() {
        selectedFile = null;
        fileInput.value = '';
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        dropzone.querySelector('.dropzone-content').style.display = 'flex';
        runAnalysisBtn.disabled = true;
    }

    // Run High-Tech Radar Diagnostic Pipeline
    runAnalysisBtn.addEventListener('click', () => {
        if (!selectedFile) return;

        stateWelcome.style.display = 'none';
        stateReport.style.display = 'none';
        stateLoading.style.display = 'flex';

        // Reset Scanner Animation Steps
        loadingProgress.style.width = '15%';
        if (loadingPctReadout) loadingPctReadout.textContent = '15%';
        lsp1.classList.add('active');
        lsp2.classList.remove('active');
        lsp3.classList.remove('active');

        loadingStatusText.textContent = currentLang === 'bn' ? 'ইমেজ নরমালাইজেশন ও নয়েজ ফিল্টারিং...' : 'Pre-processing scan data & noise filtering...';

        const stages = [
            { pct: '45%', txt: currentLang === 'bn' ? 'টিস্যু প্যাথলজি বৈশিষ্ট্য মূল্যায়ন...' : 'Executing Pathology Feature Assessment...', activeId: 'lsp2' },
            { pct: '85%', txt: currentLang === 'bn' ? 'ভলিউমেট্রিক সেগমেন্টেশন ও রিজিয়ন ম্যাপ তৈরি...' : 'Computing Volumetric Tissue Segmentation...', activeId: 'lsp3' }
        ];

        stages.forEach((s, idx) => {
            setTimeout(() => {
                if (stateLoading.style.display === 'flex') {
                    loadingProgress.style.width = s.pct;
                    if (loadingPctReadout) loadingPctReadout.textContent = s.pct;
                    loadingStatusText.textContent = s.txt;
                    if (s.activeId === 'lsp2') lsp2.classList.add('active');
                    if (s.activeId === 'lsp3') lsp3.classList.add('active');
                }
            }, (idx + 1) * 850);
        });

        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch('/api/analyze', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (!res.ok) return res.json().then(e => { throw new Error(e.error || 'Server error'); });
            return res.json();
        })
        .then(data => {
            loadingProgress.style.width = '100%';
            if (loadingPctReadout) loadingPctReadout.textContent = '100%';
            loadingStatusText.textContent = currentLang === 'bn' ? 'ডায়াগনস্টিক পরীক্ষা সম্পন্ন। রিপোর্ট তৈরি হচ্ছে...' : 'Diagnostic complete. Generating pathology report...';
            currentReportData = data;
            setTimeout(() => renderReport(data), 400);
        })
        .catch(err => {
            console.error(err);
            alert((currentLang === 'bn' ? 'পরীক্ষায় ত্রুটি: ' : 'Diagnostic error: ') + err.message);
            stateLoading.style.display = 'none';
            stateWelcome.style.display = 'flex';
        });
    });

    // Populate Report Data & Format Patient ID Prefix CB-BD-KCP-
    function renderReport(data) {
        stateLoading.style.display = 'none';
        
        inputControlsSection.style.display = 'none';
        reportLeftSection.style.display = 'block';
        stateReport.style.display = 'flex';

        const nameVal = patientNameInput.value.trim() || 'Md. Anis Ahmed';
        const ageVal = patientAgeInput.value || '45';
        const genderVal = patientGenderInput.value || 'Male';
        
        // Format Patient ID with CB-BD-KCP- prefix
        const rawNum = patientRegInput.value.trim() || '88421';
        const formattedReg = rawNum.startsWith('CB-BD-KCP-') ? rawNum : `CB-BD-KCP-${rawNum}`;

        outPatientName.textContent = nameVal;
        outPatientAgeGender.textContent = `${ageVal} ${currentLang === 'bn' ? 'বছর' : 'Yrs'} | ${genderVal}`;
        outPatientReg.textContent = formattedReg;
        outReportDate.textContent = formattedDate;

        // Pathology Guidance based on Language
        const rawClass = data.classification.class;
        const confidence = (data.classification.confidence * 100).toFixed(1) + '%';
        const info = pathologyGuide[rawClass][currentLang];

        diagnosisValue.textContent = info.title;
        diagnosisConf.textContent = confidence;
        diagnosisDesc.textContent = info.desc;
        
        riskText.textContent = info.riskText;
        diagnosisBanner.className = `diagnosis-banner ${info.riskClass}`;

        adviceExplanation.innerHTML = info.explanation;
        doctorTypeText.textContent = info.doctorType;

        adviceStepsList.innerHTML = '';
        info.steps.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = step;
            adviceStepsList.appendChild(li);
        });

        // Tab Visualizations
        imgOriginal.src = imagePreview.src;
        imgDetection.src = data.detection.image || imagePreview.src;
        imgSegmentation.src = data.segmentation.image || imagePreview.src;

        const detTabBtn = document.querySelector('.tab-btn[data-tab="tabDetection"]');
        const segTabBtn = document.querySelector('.tab-btn[data-tab="tabSegmentation"]');

        if (rawClass === 'Normal') {
            detTabBtn.style.display = 'none';
            segTabBtn.style.display = 'none';
        } else {
            detTabBtn.style.display = '';
            segTabBtn.style.display = '';
        }

        switchTab('tabOriginal');

        // Classification Probabilities
        probList.innerHTML = '';
        const probs = data.classification.probabilities;
        const classNames = ['Normal', 'Cyst', 'Stone', 'Tumor'];

        classNames.forEach(cls => {
            if (probs[cls] !== undefined) {
                const probVal = probs[cls];
                const pctStr = (probVal * 100).toFixed(1) + '%';
                
                const row = document.createElement('div');
                row.className = `prob-row ${cls}`;
                row.innerHTML = `
                    <div class="prob-label-row">
                        <span class="prob-name">${cls}</span>
                        <span class="prob-pct">${pctStr}</span>
                    </div>
                    <div class="prob-bar-container">
                        <div class="prob-bar-fill" style="width: 0%"></div>
                    </div>
                `;
                probList.appendChild(row);

                setTimeout(() => {
                    row.querySelector('.prob-bar-fill').style.width = pctStr;
                }, 80);
            }
        });

        // Segmentation Metrics
        if (data.segmentation.stats) {
            const st = data.segmentation.stats;
            statCystArea.textContent = st.cyst_area_pct.toFixed(2) + '%';
            statStoneArea.textContent = st.stone_area_pct.toFixed(2) + '%';
            statTumorArea.textContent = st.tumor_area_pct.toFixed(2) + '%';
        } else {
            statCystArea.textContent = '0.00%';
            statStoneArea.textContent = '0.00%';
            statTumorArea.textContent = '0.00%';
        }
    }

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    function switchTab(tabId) {
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabPanes.forEach(pane => {
            if (pane.id === tabId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        if (tabId === 'tabSegmentation') {
            segLegend.style.display = 'flex';
        } else {
            segLegend.style.display = 'none';
        }
    }

    // Print Report
    printReportBtn.addEventListener('click', () => {
        window.print();
    });

    // Reset Form
    resetBtn.addEventListener('click', () => {
        stateReport.style.display = 'none';
        reportLeftSection.style.display = 'none';
        inputControlsSection.style.display = 'block';
        stateWelcome.style.display = 'flex';
        currentReportData = null;
        clearFileSelection();
    });
});
