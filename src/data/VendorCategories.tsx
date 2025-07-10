import { VendorCategory } from '../types';

import bridalGroomingImg from '../images/categories/bridal-grooming.jpg';
import bridalWearImg from '../images/categories/bridal-wear.jpg';
import foodImg from '../images/categories/food.jpg';
import groomWearImg from '../images/categories/groom-wear.jpg';
import invitesGiftsImg from '../images/categories/invites-gifts.jpg';
import jewelleryImg from '../images/categories/jewellery.jpg';
import makeUpImg from '../images/categories/makeup.jpg';
import mehndiImg from '../images/categories/mehendi.jpg';
import musicDanceImg from '../images/categories/music-dance.jpg';
import panditImg from '../images/categories/pandits.jpg';
import photographersImg from '../images/categories/photographers.jpg';
import planningDecorImg from '../images/categories/planning-decor.jpg';
import preWeddingShootImg from '../images/categories/pre-wedding-shoot.jpg';
import venueImg from '../images/categories/venues.jpg';

const weddingCategories: VendorCategory[] = [
    {
        id: 'venues',
        name: 'Venues',
        subcategories: ['Banquet Halls', 'Marriage Garden / Lawns'],
        imageUrl: venueImg,
    },
    {
        id: 'photographers',
        name: 'Photographers',
        subcategories: ['Photographers'],
        imageUrl: photographersImg,
    },
    {
        id: 'makeup',
        name: 'Makeup',
        subcategories: ['Bridal Makeup', 'Family Makeup'],
        imageUrl: makeUpImg,
    },
    {
        id: 'planning-decor',
        name: 'Planning & Decor',
        subcategories: ['Wedding Planners', 'Decorators'],
        imageUrl: planningDecorImg,
    },
    {
        id: 'mehendi',
        name: 'Mehendi',
        subcategories: ['Mehendi Artist'],
        imageUrl: mehndiImg,
    },
    {
        id: 'music-dance',
        name: 'Music & Dance',
        subcategories: ['DJs', 'Sangeet Choreographer', 'Wedding Bands'],
        imageUrl: musicDanceImg,
    },
    {
        id: 'invites-gifts',
        name: 'Invites & Gifts',
        subcategories: ['Invitations', 'Favors', 'Trousseau Packers'],
        imageUrl: invitesGiftsImg,
    },
    {
        id: 'food',
        name: 'Food',
        subcategories: ['Catering Services', 'Cake', 'Chaat & Food Stalls'],
        imageUrl: foodImg,
    },
    {
        id: 'pre-wedding-shoot',
        name: 'Pre Wedding Shoot',
        subcategories: ['Pre Wedding Shoot Locations', 'Pre Wedding Photographers'],
        imageUrl: preWeddingShootImg,
    },
    {
        id: 'bridal-wear',
        name: 'Bridal Wear',
        subcategories: ['Bridal Lehengas', 'Kanjeevaram / Silk Sarees'],
        imageUrl: bridalWearImg,
    },
    {
        id: 'groom-wear',
        name: 'Groom Wear',
        subcategories: ['Sherwani', 'Wedding Suits / Tuxes'],
        imageUrl: groomWearImg,
    },
    {
        id: 'jewellery-accessories',
        name: 'Jewellery & Accessories',
        subcategories: ['Jewellery', 'Flower Jewellery', 'Bridal Jewellery'],
        imageUrl: jewelleryImg,
    },
    {
        id: 'pandits',
        name: 'Pandits',
        subcategories: ['Wedding Pandits'],
        imageUrl: panditImg,
    },
    {
        id: 'bridal-grooming',
        name: 'Bridal Grooming',
        subcategories: ['Beauty and Wellness'],
        imageUrl: bridalGroomingImg,
    },
];

export default weddingCategories;