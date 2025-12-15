// 모바일 네비게이션 토글
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// 네비게이션 링크 부드러운 스크롤링
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 활성 네비게이션 하이라이트
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// 스크롤 애니메이션
// Intersection Observer 설정 - 요소가 화면에 10% 보일 때 애니메이션 트리거
const observerOptions = {
  threshold: 0.1, // 요소의 10%가 보일 때
  rootMargin: "0px 0px -50px 0px", // 하단에서 50px 전에 트리거
};

// Intersection Observer 생성 - 요소가 화면에 들어올 때 애니메이션 적용
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); // fade-in 애니메이션 클래스 추가
    }
  });
}, observerOptions);

// 애니메이션을 위한 요소 관찰
// DOM이 완전히 로드된 후 애니메이션 대상 요소들을 관찰 시작
document.addEventListener("DOMContentLoaded", () => {
  // 애니메이션을 적용할 요소들 선택
  const animateElements = document.querySelectorAll(
    ".timeline-item, .project-card, .skill-item, .stat-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("fade-in"); // 초기 상태를 투명하게 설정
    observer.observe(el); // 각 요소를 관찰 대상에 추가
  });
});

// 스킬 바 애니메이션
// 모든 스킬 진행률 바 요소 선택
const skillBars = document.querySelectorAll(".skill-progress");

// 스킬 바 전용 Intersection Observer - 50% 보일 때 애니메이션 시작
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.style.width; // 원래 너비 저장
        progressBar.style.width = "0%"; // 애니메이션을 위해 0%로 초기화

        // 200ms 후 원래 너비로 애니메이션
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  },
  { threshold: 0.5 }
); // 요소의 50%가 보일 때 트리거

// 각 스킬 바를 관찰 대상에 추가
skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// 히어로 제목을 위한 터미널 스타일 타이핑 효과
// 텍스트를 한 글자씩 타이핑하는 애니메이션 함수
function typeWriter(element, text, speed = 100) {
  let i = 0; // 현재 타이핑할 문자 인덱스
  element.innerHTML = ""; // 요소 내용 초기화

  function type() {
    if (i < text.length) {
      const char = text.charAt(i); // 현재 문자 가져오기
      element.innerHTML += char; // 문자를 요소에 추가
      i++; // 다음 문자로 이동

      // 커서 효과 추가 (마지막 문자가 아닐 때만)
      if (i < text.length) {
        element.innerHTML += '<span class="cursor">|</span>';
      }

      // 지정된 속도만큼 대기 후 다음 문자 타이핑
      setTimeout(() => {
        // 다음 문자 추가 전 커서 제거
        const cursor = element.querySelector(".cursor");
        if (cursor) cursor.remove();
        type(); // 재귀 호출로 다음 문자 타이핑
      }, speed);
    } else {
      // 모든 문자 타이핑 완료 - 최종 커서 추가
      element.innerHTML += '<span class="cursor">|</span>';
    }
  }

  type(); // 타이핑 애니메이션 시작
}

// 페이지 로드 시 타이핑 효과 초기화
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title"); // 히어로 제목 요소 선택
  if (heroTitle) {
    const originalText = heroTitle.textContent; // 원본 텍스트 저장
    typeWriter(heroTitle, originalText, 80); // 80ms 속도로 타이핑 애니메이션 시작
  }

  // 터미널 스타일 커서 애니메이션 추가
  // 커서 깜빡임 효과를 위한 CSS 스타일 동적 생성
  const style = document.createElement("style");
  style.textContent = `
        .cursor {
            animation: blink 1s infinite;  // 1초마다 깜빡임 반복
            color: #00ff41;  // 터미널 그린 색상
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }    // 0-50%: 완전히 보임
            51%, 100% { opacity: 0; }  // 51-100%: 완전히 투명
        }
    `;
  document.head.appendChild(style); // head에 스타일 추가
});

// 맨 위로 가기 버튼
// 동적으로 맨 위로 가기 버튼 생성
const backToTopButton = document.createElement("button");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // 위쪽 화살표 아이콘
backToTopButton.className = "back-to-top"; // CSS 클래스 적용

document.body.appendChild(backToTopButton); // body에 버튼 추가

// 스크롤 위치에 따른 버튼 표시/숨김
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    // 300px 이상 스크롤했을 때
    backToTopButton.style.opacity = "1"; // 버튼 보이기
    backToTopButton.style.visibility = "visible";
  } else {
    // 300px 미만일 때
    backToTopButton.style.opacity = "0"; // 버튼 숨기기
    backToTopButton.style.visibility = "hidden";
  }
});

// 버튼 클릭 시 페이지 맨 위로 부드럽게 스크롤
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0, // 맨 위로 이동
    behavior: "smooth", // 부드러운 스크롤 애니메이션
  });
});

// 맨 위로 가기 버튼에 호버 효과 추가
// 마우스가 버튼 위에 올라갔을 때
backToTopButton.addEventListener("mouseenter", () => {
  backToTopButton.style.background = "#0056b3"; // 배경색 변경
  backToTopButton.style.transform = "scale(1.1)"; // 크기 확대
});

// 마우스가 버튼에서 벗어났을 때
backToTopButton.addEventListener("mouseleave", () => {
  backToTopButton.style.background = "#007bff"; // 원래 배경색으로 복원
  backToTopButton.style.transform = "scale(1)"; // 원래 크기로 복원
});

// 성능 최적화: 스크롤 이벤트 디바운스
// 연속된 이벤트 호출을 제한하여 성능을 향상시키는 함수
function debounce(func, wait) {
  let timeout; // 타이머 ID 저장
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout); // 이전 타이머 취소
      func(...args); // 실제 함수 실행
    };
    clearTimeout(timeout); // 기존 타이머 취소
    timeout = setTimeout(later, wait); // 새로운 타이머 설정
  };
}

// 스크롤 이벤트에 디바운스 적용
// 10ms 간격으로 스크롤 이벤트 제한
const debouncedScrollHandler = debounce(() => {
  // 스크롤 이벤트 로직 (현재는 비어있음)
}, 10);

window.addEventListener("scroll", debouncedScrollHandler); // 디바운스된 스크롤 핸들러 등록

// 버튼에 로딩 상태 추가
// 모든 버튼에 클릭 이벤트 리스너 추가
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.href && this.href.startsWith("#")) {
      // 내부 링크, 로딩 표시 안함
      return;
    }

    // 외부 링크에 로딩 상태 추가
    const originalText = this.textContent; // 원본 텍스트 저장
    this.textContent = "로딩 중..."; // 로딩 텍스트로 변경
    this.disabled = true; // 버튼 비활성화

    // 2초 후 원래 상태로 복원
    setTimeout(() => {
      this.textContent = originalText; // 원본 텍스트 복원
      this.disabled = false; // 버튼 활성화
    }, 2000);
  });
});

// 툴팁 기능 추가
// data-tooltip 속성을 가진 모든 요소에 툴팁 기능 추가
document.querySelectorAll("[data-tooltip]").forEach((element) => {
  // 마우스가 요소 위에 올라갔을 때 툴팁 표시
  element.addEventListener("mouseenter", function () {
    const tooltip = document.createElement("div"); // 툴팁 요소 생성
    tooltip.className = "tooltip";
    tooltip.textContent = this.getAttribute("data-tooltip"); // 툴팁 텍스트 설정
    tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;  // 마우스 이벤트 차단
            white-space: nowrap;  // 텍스트 줄바꿈 방지
        `;

    document.body.appendChild(tooltip); // body에 툴팁 추가

    // 요소 위치 계산하여 툴팁 위치 설정
    const rect = this.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"; // 가로 중앙 정렬
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"; // 요소 위쪽에 표시
  });

  // 마우스가 요소에서 벗어났을 때 툴팁 제거
  element.addEventListener("mouseleave", function () {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove(); // 툴팁 제거
    }
  });
});

// 터미널 스타일 콘솔 출력
// 개발자 도구 콘솔에 컬러풀한 메시지 출력
console.log(
  "%c🚀 Portfolio Website Loaded Successfully!",
  "color: #00ff41; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c> Initializing developer portfolio...",
  "color: #58a6ff; font-family: monospace;"
);
console.log(
  "%c> Dark theme activated",
  "color: #00ff41; font-family: monospace;"
);
console.log(
  "%c> Ready for development!",
  "color: #ffff00; font-family: monospace;"
);

// 콘솔을 위한 터미널 스타일 타이핑 효과
// 콘솔에 터미널 스타일 메시지를 타이핑하는 함수
function terminalTyping() {
  const messages = [
    "> Welcome to Developer Portfolio",
    "> Loading experience data...",
    "> Initializing skills matrix...",
    "> Ready to showcase projects",
    "> Portfolio system online ✓",
  ];

  let messageIndex = 0; // 현재 메시지 인덱스
  let charIndex = 0; // 현재 문자 인덱스

  function typeMessage() {
    if (messageIndex < messages.length) {
      const message = messages[messageIndex]; // 현재 메시지 가져오기
      if (charIndex < message.length) {
        // 브라우저 환경에서는 console.log만 사용
        //console.log(message[charIndex]);  // 현재 문자 출력
        charIndex++; // 다음 문자로 이동
        setTimeout(typeMessage, 50); // 50ms 후 다음 문자
      } else {
        //console.log(''); // 빈 줄 추가
        messageIndex++; // 다음 메시지로 이동
        charIndex = 0; // 문자 인덱스 초기화
        setTimeout(typeMessage, 500); // 500ms 후 다음 메시지
      }
    }
  }

  // 모든 환경에서 실행 (GitHub Pages 포함)
  typeMessage(); // 타이핑 애니메이션 시작
}

// 터미널 효과 초기화
terminalTyping();

// 터미널 스타일 명령어 인터페이스
function createTerminalInterface() {
  const terminal = document.createElement("div");
  terminal.className = "terminal-interface";
  terminal.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
            </div>
            <div class="terminal-title">developer@portfolio:~$</div>
        </div>
        <div class="terminal-body">
            <div class="terminal-output">
                <div class="terminal-line">Welcome to Developer Portfolio Terminal</div>
                <div class="terminal-line">Type 'help' for available commands</div>
                <div class="terminal-line">Type 'clear' to clear the terminal</div>
            </div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">developer@portfolio:~$</span>
                <input type="text" class="terminal-input" placeholder="Enter command...">
            </div>
        </div>
    `;

  // 터미널 스타일 추가
  const terminalStyles = document.createElement("style");
  terminalStyles.textContent = `
        .terminal-interface {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 500px;
            height: 300px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 10px 30px var(--shadow-color);
            z-index: 1001;
            display: none;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .terminal-header {
            background: var(--bg-secondary);
            padding: 10px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .terminal-buttons {
            display: flex;
            gap: 5px;
        }
        
        .terminal-btn {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .terminal-btn.close { background: #ff5f56; }
        .terminal-btn.minimize { background: #ffbd2e; }
        .terminal-btn.maximize { background: #27ca3f; }
        
        .terminal-title {
            color: var(--text-secondary);
            font-size: 12px;
        }
        
        .terminal-body {
            height: calc(100% - 50px);
            padding: 10px;
            overflow-y: auto;
        }
        
        .terminal-output {
            margin-bottom: 10px;
        }
        
        .terminal-line {
            color: var(--text-secondary);
            margin-bottom: 5px;
            font-size: 12px;
        }
        
        .terminal-input-line {
            display: flex;
            align-items: center;
        }
        
        .terminal-prompt {
            color: var(--terminal-green);
            margin-right: 5px;
            font-size: 12px;
        }
        
        .terminal-input {
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            outline: none;
            flex: 1;
        }
        
        .terminal-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background: var(--terminal-green);
            color: var(--bg-primary);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1002;
            font-size: 20px;
            transition: all 0.3s ease;
        }
        
        .terminal-toggle:hover {
            background: var(--accent-primary);
            transform: scale(1.1);
        }
    `;
  document.head.appendChild(terminalStyles);

  // 터미널 토글 버튼 추가
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "terminal-toggle";
  toggleBtn.innerHTML = ">_";
  toggleBtn.title = "Open Terminal";

  document.body.appendChild(terminal);
  document.body.appendChild(toggleBtn);

  // 터미널 기능
  const terminalInput = terminal.querySelector(".terminal-input");
  const terminalOutput = terminal.querySelector(".terminal-output");

  const commands = {
    help: () => {
      addTerminalLine("Available commands:");
      addTerminalLine("  help - Show this help message");
      addTerminalLine("  clear - Clear terminal");
      addTerminalLine("  about - Show about information");
      addTerminalLine("  skills - Show technical skills");
      addTerminalLine("  projects - Show projects");
      addTerminalLine("  contact - Show contact info");
      addTerminalLine("  exit - Close terminal");
    },
    clear: () => {
      terminalOutput.innerHTML = "";
    },
    about: () => {
      addTerminalLine("Developer Portfolio v1.0");
      addTerminalLine("15+ years of development experience");
      addTerminalLine("Specialized in web and backend development");
      addTerminalLine("Focus on stability and performance");
    },
    skills: () => {
      addTerminalLine("Technical Skills:");
      addTerminalLine("  Backend: .NET Core, ASP.NET, C#, Java, Spring Boot");
      addTerminalLine("  Database: MS-SQL, MySQL");
      addTerminalLine("  Frontend: JavaScript, jQuery, HTML5, CSS3");
      addTerminalLine("  Tools: Git, GitHub, Jira, REST API");
    },
    projects: () => {
      addTerminalLine("Key Projects:");
      addTerminalLine(
        "  Payment Service Refactoring (Classic ASP → .NET Core)"
      );
      addTerminalLine(
        "  Various Payment Services (URL, HectopemBang, Apple Pay)"
      );
      addTerminalLine("  Investment Platform Development");
      addTerminalLine("  Tower Defense Game (Personal Project)");
    },
    contact: () => {
      addTerminalLine("Contact Information:");
      addTerminalLine("  Email: Please check resume for details");
      addTerminalLine("  Location: Please check resume for details");
      addTerminalLine("  Available for new opportunities");
    },
    exit: () => {
      terminal.style.display = "none";
    },
  };

  function addTerminalLine(text) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function executeCommand(command) {
    addTerminalLine(`developer@portfolio:~$ ${command}`);

    if (commands[command]) {
      commands[command]();
    } else {
      addTerminalLine(`Command not found: ${command}`);
      addTerminalLine('Type "help" for available commands');
    }
  }

  // 이벤트 리스너
  toggleBtn.addEventListener("click", () => {
    terminal.style.display =
      terminal.style.display === "none" ? "block" : "none";
    if (terminal.style.display === "block") {
      terminalInput.focus();
    }
  });

  terminalInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const command = terminalInput.value.trim().toLowerCase();
      if (command) {
        executeCommand(command);
      }
      terminalInput.value = "";
    }
  });

  // 외부 클릭 시 터미널 닫기
  document.addEventListener("click", (e) => {
    if (!terminal.contains(e.target) && !toggleBtn.contains(e.target)) {
      terminal.style.display = "none";
    }
  });
}

// 터미널 인터페이스 초기화
createTerminalInterface();

// 이미지 모달 기능
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".modal-close");

// 프로젝트 이미지 클릭 시 모달 열기
document.querySelectorAll(".project-image img").forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "flex"; // 모달 표시
    modalImg.src = this.src; // 클릭한 이미지의 src 설정
    modalCaption.textContent = this.alt; // 이미지 alt 텍스트를 캡션으로 설정
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지
  });
});

// 모달 닫기 버튼 클릭
closeBtn.addEventListener("click", function () {
  modal.style.display = "none"; // 모달 숨김
  document.body.style.overflow = "auto"; // 배경 스크롤 복원
});

// 모달 배경 클릭 시 닫기
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    // 배경을 클릭한 경우만
    modal.style.display = "none"; // 모달 숨김
    document.body.style.overflow = "auto"; // 배경 스크롤 복원
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none"; // 모달 숨김
    document.body.style.overflow = "auto"; // 배경 스크롤 복원
  }
});
