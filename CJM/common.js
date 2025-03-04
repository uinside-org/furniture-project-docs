document.addEventListener('DOMContentLoaded', function() {
    // Загружаем шапку и подвал
    loadComponent('header', 'header.html', function() {
        // После загрузки шапки обновляем активную ссылку
        updateActiveLink();
    });
    loadComponent('footer', 'footer.html');
    
    // Инициализируем языковые настройки
    initializeLanguage();
});

// Функция для загрузки HTML компонентов
function loadComponent(target, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(target).innerHTML = html;
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Error loading ${file}:`, error);
        });
}

// Функция для определения активной ссылки в меню
function updateActiveLink() {
    // Получаем текущий путь
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // Находим все навигационные ссылки
    const navLinks = document.querySelectorAll('.site-navigation .nav-link');
    
    // Убираем класс active у всех ссылок
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Если href ссылки совпадает с текущим путем, добавляем класс active
        if (link.getAttribute('href') === filename) {
            link.classList.add('active');
        }
    });
}

// Функция для инициализации языковых настроек
function initializeLanguage() {
    // Проверяем сохраненный выбор языка
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
    
    // Добавляем обработчики для кнопок переключения языка
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('language-btn')) {
            const lang = event.target.getAttribute('data-lang');
            switchLanguage(lang);
        }
    });
}

// Функция для переключения языка
function switchLanguage(lang) {
    // Установка языка для всех переводимых элементов
    document.querySelectorAll('[data-ru], [data-pl], [data-en]').forEach(element => {
        if (element.getAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Установка языка документа
    document.documentElement.lang = lang;
    
    // Обновление состояния кнопок
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Сохранение выбора пользователя
    localStorage.setItem('preferred-language', lang);
} 