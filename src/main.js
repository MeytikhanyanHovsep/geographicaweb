import './style.css'
import Alpine from 'alpinejs'

window.Alpine = Alpine

document.addEventListener('alpine:init', () => {
    Alpine.data('headerData', () => ({
        openedIndex: null,
        isMobileMenuOpen: false,
        menuItems: [
            { name: 'Натуральные камни', link: 'stone-catalog', sub: ['Мрамор', 'Оникс', 'Гранит'] },
            { name: 'Изделия из камней', link: 'stone-catalog', sub: ['Столешницы', 'Подоконники'] },
            { name: 'Услуги', link: 'services', sub: ['Монтаж', 'Полировка'] },
            { name: 'Блог', link: 'blog', sub: null },
            { name: 'О компании', link: 'about', sub: null },
            { name: 'Контакты', link: 'contacts', sub: null }
        ],
        toggleSubmenu(index) {
            this.openedIndex = this.openedIndex === index ? null : index;
        }
    }));


});

// 2. ЗАПУСК ДОЛЖЕН БЫТЬ В САМОМ КОНЦЕ
Alpine.start()


function sortTags() {
    return {
        open: null,
        selected: {},

        tags: [
            {
                key: 'discount',
                name: 'Скидка',
                options: [
                    { label: 'По возрастанию', value: 'asc' },
                    { label: 'По убыванию', value: 'desc' },
                ],
            },
            {
                key: 'price',
                name: 'Цена',
                options: [
                    { label: 'Сначала дешёвые', value: 'low' },
                    { label: 'Сначала дорогие', value: 'high' },
                ],
            },
            {
                key: 'delivery',
                name: 'Доставка',
                options: [
                    { label: 'Бесплатная', value: 'free' },
                    { label: 'Платная', value: 'paid' },
                ],
            },
        ],

        toggle(key) {
            this.open = this.open === key ? null : key;
        },

        select(tagKey, value) {
            this.selected[tagKey] = value;
            this.open = null;

            // тут вызываешь сортировку
            console.log('sort:', tagKey, value);
        },
    }
}

class ProductCard extends HTMLElement {
    connectedCallback() {
        // Получаем данные из атрибутов тега
        const name = this.getAttribute('name') || 'Без названия';
        const img = this.getAttribute('img') || '';

        // Твоя верстка без изменений
        this.innerHTML = `
        <div class="group relative flex flex-col overflow-hidden transition-all duration-500 gap-2">
          <div class="overflow-hidden">
            <img src="${img}" alt="${name}"
                class="w-full max-sm:h-[162px] h-[188px] object-cover transition-transform duration-500 will-change-transform group-hover:scale-110">
          </div>
          <ul class="w-full mt-[10px] grid grid-cols-3 gap-[18px]">
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">
              гранит
            </li>
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">
              песчаник
            </li>
            <li class="h-[28px] text-[14px] grid place-items-center border border-primary/50 text-center">
              камень
            </li>
          </ul>
          <h3 class="text-[14px] font-bold text-dark tracking-wide">${name}</h3>
          <p class="text-dark leading-[130%] max-sm:tracking-[0.3px] max-w-[353px] text-[14px] mb-[7px]">
            Благодаря превосходным качествам, изделия из гранита находят широкое применение во всех сферах жизнедеятельности человека
          </p>
          <div class="flex mb-[10px] gap-[17px] justify-center items-center text-[14px] text-dark">
            <span class="text-dark font-bold whitespace-nowrap">от 7 950 руб. / м²</span>
            <p class="bg-dark/4 w-full h-[28px] flex justify-center gap-[11px] items-center">
              <span class="w-[9px] animate-pulse aspect-square rounded-full bg-primary"></span> хорошая цена
            </p>
          </div>
          <button class="h-[55px] bg-transparent text-dark cursor-pointer font-bold text-[14px] border-2 border-primary hover:bg-primary transition-all">
            Заказать
          </button>
        </div>
    `;
    }
}

customElements.define('product-card', ProductCard);