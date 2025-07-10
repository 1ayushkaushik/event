import { Vendor } from '../types';
import radissonImg from '../images/venues/radisson.jpg';
import grapeImg from '../images/venues/grape country.jpg';
import bayviewImg from '../images/venues/bayview.jpg';

import wedinxImg from '../images/photographers/wedinx.jpg';
import candidStudioImg from '../images/photographers/candid-studio.jpg';
import weddingCreationImg from '../images/photographers/wedding-creation.jpg';


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
    }

];

export default vendorData;