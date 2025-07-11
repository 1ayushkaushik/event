import { Vendor } from '../types';
import radissonImg from '../images/venues/radisson.jpg';
import grapeImg from '../images/venues/grape country.jpg';
import bayviewImg from '../images/venues/bayview.jpg';

import wedinxImg from '../images/photographers/wedinx.jpg';
import candidStudioImg from '../images/photographers/candid-studio.jpg';
import weddingCreationImg from '../images/photographers/wedding-creation.jpg';

import bharathyImg from '../images/makeup/bharathy-sarathy.jpg';
import binaImg from '../images/makeup/bina-punjani.jpg';
import blushingImg from '../images/makeup/blushing-beauty.jpg';

import craftingImg from '../images/planning-decor/crafting-memories.jpg';
import perfectKnotImg from '../images/planning-decor/perfect-knot.jpg';
import wedFamImg from '../images/planning-decor/wed-fam.jpg';

import NSMehendiImg from '../images/mehendi/NS-mehendi.jpg';
import manojMehendiImg from '../images/mehendi/manoj-kumar-mehendi.jpg';
import rahulMehendiImg from '../images/mehendi/rahul-mehendi.jpg';

import minusplusImg from '../images/music-dance/minusplus.jpg';
import musicHouseImg from '../images/music-dance/music-house.jpg';
import marioImg from '../images/music-dance/mario.jpg';

const vendorData: Vendor[] = [
    {
        "id": "1",
        "name": "Bayview Resort",
        "category": "venues",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Banquet Halls", "Marriage Garden / Lawns"],
        "contracts": [],
        "totalCost": 3000000,
        "costPer": "per day",
        "location": "Mumbai",
        "imageUrl": bayviewImg
    },
    {
        "id": "2",
        "name": "Radisson Blu",
        "category": "venues",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 3,
        "services": ["Banquet Halls"],
        "contracts": [],
        "totalCost": 4500000,
        "costPer": "per day",
        "location": "Andheri East, Mumbai",
        "imageUrl": radissonImg
    },
    {
        "id": "3",
        "name": "Grape Country Resort",
        "category": "venues",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Eco Resort", "Banquet Halls"],
        "contracts": [],
        "totalCost": 1650000,
        "costPer": "per day",
        "location": "Nashik",
        "imageUrl": grapeImg
    },
    {
        "id": "4",
        "name": "WEDINX Studio",
        "category": "photographers",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Photography", "Cinematography"],
        "contracts": [],
        "totalCost": 50000,
        "costPer": "per day",
        "location": "Bangalore",
        "imageUrl": wedinxImg
    },
    {
        "id": "5",
        "name": "Candid Studio",
        "category": "photographers",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Photography", "Cinematography"],
        "contracts": [],
        "totalCost": 95000,
        "costPer": "per day",
        "location": "Jaipur",
        "imageUrl": candidStudioImg
    },
    {
        "id": "6",
        "name": "Wedding Creation",
        "category": "photographers",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Photography", "Cinematography", "Drone Services"],
        "contracts": [],
        "totalCost": 35000,
        "costPer": "per day",
        "location": "Kolkata",
        "imageUrl": weddingCreationImg
    },
    {
        "id": "7",
        "name": "Bharathy Sarathy Makeovers",
        "category": "makeup",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Bridal Makeup", "Family Makeup"],
        "contracts": [],
        "totalCost": 12500,
        "costPer": "per function",
        "location": "Chennai",
        "imageUrl": bharathyImg
    },
    {
        "id": "8",
        "name": "Blushing Beauty by Akansha Thakur",
        "category": "makeup",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 3,
        "services": ["Bridal Makeup", "Family Makeup"],
        "contracts": [],
        "totalCost": 10000,
        "costPer": "per function",
        "location": "Varanasi",
        "imageUrl": blushingImg
    },
    {
        "id": "9",
        "name": "Bina Punjani Hair Studio",
        "category": "makeup",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Bridal Makeup", "Family Makeup"],
        "contracts": [],
        "totalCost": 25000,
        "costPer": "per function",
        "location": "Goa",
        "imageUrl": binaImg
    },
    {
        "id": "10",
        "name": "Crafting Memories ",
        "category": "planning-decor",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Decorators", "Wedding Planners"],
        "contracts": [],
        "totalCost": 250000,
        "costPer": "per function",
        "location": "Goa",
        "imageUrl": craftingImg
    },
    {
        "id": "11",
        "name": "The Perfect Knot",
        "category": "planning-decor",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Wedding Planners"],
        "contracts": [],
        "totalCost": 200000,
        "costPer": "per function",
        "location": "Goa",
        "imageUrl": perfectKnotImg
    },
    {
        "id": "12",
        "name": "The Wed Fam",
        "category": "planning-decor",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Decorators"],
        "contracts": [],
        "totalCost": 300000,
        "costPer": "per function",
        "location": "South Mumbai",
        "imageUrl": wedFamImg
    },
    {
        "id": "13",
        "name": "NS Mehendi Arts",
        "category": "mehendi",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 7000,
        "costPer": "per hour",
        "location": "Chembur,Mumbai",
        "imageUrl": NSMehendiImg
    },
    {
        "id": "14",
        "name": "Manoj Gupta Mehendi",
        "category": "mehendi",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 3,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 2000,
        "costPer": "per hour",
        "location": "Delhi NCR",
        "imageUrl": manojMehendiImg
    },
    {
        "id": "15",
        "name": "Rahul Mehendi Art",
        "category": "mehendi",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 5000,
        "costPer": "per hour",
        "location": "Jaipur",
        "imageUrl": rahulMehendiImg
    },
    {
        "id": "16",
        "name": "DJ Mario",
        "category": "music-dance",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 4,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 30000,
        "costPer": "per event",
        "location": "Bangalore",
        "imageUrl": marioImg
    },
    {
        "id": "17",
        "name": "The Music House",
        "category": "music-dance",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 3,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 8000,
        "costPer": "per event",
        "location": "Chennai",
        "imageUrl": musicHouseImg
    },
    {
        "id": "18",
        "name": "DJ MinusPlus",
        "category": "music-dance",
        "contact": "+91 9876543100",
        "email": "grand@venues.com",
        "rating": 5,
        "services": ["Mehendi Artist"],
        "contracts": [],
        "totalCost": 15000,
        "costPer": "per event",
        "location": "Bangalore",
        "imageUrl": minusplusImg
    }
];

export default vendorData;