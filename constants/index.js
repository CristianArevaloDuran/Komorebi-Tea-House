const sections = [
    {
        id: 'home',
        title: 'Inicio',
    },
    {
        id: 'about',
        title: 'Filosofía',
    },
    {
        id: 'menu',
        title: 'Menú'
    },
    {
        id: 'contact',
        title: 'Contacto'
    }
]

const products = [
    {
        name: 'Matcha Ceremonial Uji',
        description: 'Té verde en polvo de grado premium, batido a mano hasta lograr una espuma cremosa y vibrante.',
        ingredients: [
            '100% Hoja de té verde (Tencha) molida en piedra.'
        ],
        nutrition: [
            {
                name: 'Calorias',
                value: '3 kcal'
            },
            {
                name: 'Carbohidratos',
                value: '0.5g'
            },
            {
                name: 'Proteína',
                value: '0.4g'
            }
        ],
        img: '/Komorebi-Tea-House/images/matcha.webp'
    },
    {
        name: 'Hojicha Latte',
        description: 'Té verde tostado con notas de cacao y frutos secos, mezclado con leche de avena vaporizada.',
        ingredients: [
            'Té Hojicha molido',
            'Leche de avena',
            'Esencia de vainilla'
        ],
        nutrition: 
        [
            {
                name: 'Calorias',
                value: '120 kcal'
            },
            {
                name: 'Grasas',
                value: '4g'
            },
            {
                name: 'Azúcares',
                value: '6g'
            }
        ],
        img: '/Komorebi-Tea-House/images/latte.webp'
    },
    {
        name: 'Genmaicha Especial',
        description: 'El clásico "té de palomitas" con un aroma ahumado y reconfortante.',
        ingredients: [
            'Té verde Bancha',
            'Arroz integral tostado'
        ],
        nutrition: 
        [
            {
                name: 'Calorias',
                value: '2 kcal'
            },
            {
                name: 'Carbohidratos',
                value: '0.2g'
            }
        ],
        img: '/Komorebi-Tea-House/images/genmaicha.webp'
    },
    {
        name: 'Sakura Mochi',
        description: 'Pastel de arroz dulce relleno de pasta de frijol rojo y envuelto en una hoja de cerezo encurtida.',
        ingredients: [
            'Arroz glutinoso',
            'Anko (frijol rojo)',
            'Hoja de cerezo',
            'Colorante natural'
        ],
        nutrition: 
        [
            {
                name: 'Calorias',
                value: '150 kcal'
            },
            {
                name: 'Carbohidratos',
                value: '35g'
            },
            {
                name: 'Fibra',
                value: '2g'
            }
        ],
        img: '/Komorebi-Tea-House/images/mochi.webp'
    },
    {
        name: 'Yuzu Sparkling Tea',
        description: 'Una infusión fría de té verde con el toque cítrico y refrescante del fruto Yuzu japonés.',
        ingredients: [
            'Té verde frío',
            'Pulpa de Yuzu',
            'Agua carbonatada',
            'Miel'
        ],
        nutrition: 
        [
            {
                name: 'Calorias',
                value: '45 kcal'
            },
            {
                name: 'Azúcares',
                value: '10g'
            },
            {
                name: 'Vitamina C',
                value: '30%'
            }
        ],
        img: '/Komorebi-Tea-House/images/tea.webp'
    },
    {
        name: 'Kurogoma Pudding',
        description: 'Pudín sedoso de sésamo negro con una textura rica y un sabor profundo a nuez.',
        ingredients: [
            'Sésamo negro orgánico',
            'Leche de coco',
            'Agar-Agar',
            'Sirope de arce'
        ],
        nutrition: 
        [
            {
                name: 'Calorias',
                value: '180 kcal'
            },
            {
                name: 'Grasas',
                value: '12g'
            },
            {
                name: 'Proteína',
                value: '3g'
            }
        ],
        img: '/Komorebi-Tea-House/images/pudding.webp'
    },
]

export { sections, products };