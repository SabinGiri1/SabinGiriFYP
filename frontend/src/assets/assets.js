import petskhana from './petskhana.jpg';
import dropdownIcon from './dropdown_icon.svg';
import profilePic from './profile_pic.png';
import group_profiles from './group_profiles.png';
import arrow_icon from './arrow_icon.svg';
import header_img from './header_img.png';
import Grooming from './grooming.jpg';
import Clinic from './clinic.jpg';
import Vaccination from './vaccination.jpg';
import vet1 from './vet1.png';
import vet2 from './vet2.png';
import vet3 from './vet3.png';
import vet4 from './vet4.png';
import vet5 from './vet5.png';
import vet6 from './vet6.png';
import vet7 from './vet7.png';
import vet8 from './vet8.png';
import vet9 from './vet9.png';
import vet10 from './vet10.png';
import vet11 from './vet11.png';
import vet12 from './vet12.png';
import vet13 from './vet13.png';
import vet14 from './vet14.png';
import vet15 from './vet15.png';
import bannerimage from './bannerimage.png'
import verified_icon from './verified_icon.svg'
import info_icon from './info_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'

export const assets = {
    petskhana,
    dropdownIcon,
    profilePic,
    group_profiles,
    arrow_icon,
    header_img,
    Grooming,
    Clinic,
    Vaccination,
    bannerimage,
    verified_icon,
    info_icon,
    menu_icon,
    cross_icon
};

export const specialityData = [
    {
        speciality: 'Grooming',
        image: Grooming,
    },
    {
        speciality: 'Clinic',
        image: Clinic,
    },
    {
        speciality: 'Vaccination',
        image: Vaccination,
    },
];

export const veterinarians = [
    {
        _id: 'vet1',
        name: 'Dr. Jack Robinson',
        image: vet1,
        speciality: 'Vaccination',
        degree: 'DVM',
        experience: '5 Years',
        about: 'Dr. Robinson is dedicated to providing top-notch care for your pets, with a focus on surgery, diagnostics, and rehabilitation.',
        fees: 100,
        address: {
            line1: '22nd Cross, Greenfield',
            line2: 'East Avenue, San Francisco'
        }
    },
    {
        _id: 'vet2',
        name: 'Dr. Olivia Williams',
        image: vet2,
        speciality: 'Vaccination',
        degree: 'DVM',
        experience: '3 Years',
        about: 'Dr. Williams specializes in small animal care, offering a wide range of services, including vaccinations, checkups, and surgery.',
        fees: 80,
        address: {
            line1: '35th Cross, Oakwood',
            line2: 'River Lane, Los Angeles'
        }
    },
    {
        _id: 'vet3',
        name: 'Dr. Ethan Harris',
        image: vet3,
        speciality: 'Vaccination',
        degree: 'DVM, MVS',
        experience: '4 Years',
        about: 'Dr. Harris offers specialized care for pets, particularly in orthopedic treatments and emergency surgery.',
        fees: 120,
        address: {
            line1: '10th Cross, Lakeside',
            line2: 'Northgate, Seattle'
        }
    },
    {
        _id: 'vet4',
        name: 'Dr. Ava Scott',
        image: vet4,
        speciality: 'Vaccination',
        degree: 'DVM',
        experience: '2 Years',
        about: 'Dr. Scott focuses on dental care for pets, offering routine cleanings, extractions, and other dental procedures to keep your pets smiling.',
        fees: 90,
        address: {
            line1: '44th Cross, Pinewood',
            line2: 'West Blvd, New York'
        }
    },
    {
        _id: 'vet5',
        name: 'Dr. Noah Clark',
        image: vet5,
        speciality: 'Vaccination',
        degree: 'DVM',
        experience: '6 Years',
        about: 'Dr. Clark specializes in exotic animal care, providing services for reptiles, birds, and small mammals.',
        fees: 150,
        address: {
            line1: '17th Cross, Hilltop',
            line2: 'Main Street, Miami'
        }
    },
    {
        _id: 'vet6',
        name: 'Dr. Isabella Moore',
        image: vet6,
        speciality: 'Clinic',
        degree: 'DVM',
        experience: '7 Years',
        about: 'Dr. Moore is an expert in emergency care, offering life-saving treatments and quick intervention for pets in critical conditions.',
        fees: 200,
        address: {
            line1: '55th Cross, Sunnydale',
            line2: 'Kingston Ave, Boston'
        }
    },
    {
        _id: 'vet7',
        name: 'Dr. Lucas Johnson',
        image: vet7,
        speciality: 'Clinic',
        degree: 'DVM, MVS',
        experience: '4 Years',
        about: 'Dr. Johnson specializes in animal surgery, performing both routine and complex procedures to ensure the health of your pets.',
        fees: 110,
        address: {
            line1: '27th Cross, Seaside',
            line2: 'Ocean Drive, San Diego'
        }
    },
    {
        _id: 'vet8',
        name: 'Dr. Mia Brown',
        image: vet8,
        speciality: 'Clinic',
        degree: 'DVM',
        experience: '3 Years',
        about: 'Dr. Brown provides care for pets with skin conditions, offering treatments for allergies, infections, and other dermatological issues.',
        fees: 75,
        address: {
            line1: '63rd Cross, Riverbend',
            line2: 'Park Lane, Chicago'
        }
    },
    {
        _id: 'vet9',
        name: 'Dr. William White',
        image: vet9,
        speciality: 'Grooming',
        degree: 'DVM',
        experience: '5 Years',
        about: 'Dr. White specializes in cardiology, offering diagnosis and treatment for heart-related issues in pets.',
        fees: 140,
        address: {
            line1: '72nd Cross, Maplewood',
            line2: 'Lakeview Ave, Denver'
        }
    },
    {
        _id: 'vet10',
        name: 'Dr. Sophia Taylor',
        image: vet10,
        speciality: 'Grooming',
        degree: 'DVM',
        experience: '6 Years',
        about: 'Dr. Taylor is an expert in internal medicine, treating conditions related to the organs, digestive system, and metabolic disorders of pets.',
        fees: 130,
        address: {
            line1: '18th Cross, Redwood',
            line2: 'Eagle Hill, Phoenix'
        }
    },
    {
        _id: 'vet11',
        name: 'Dr. Benjamin Lee',
        image: vet11,
        speciality: 'Grooming',
        degree: 'DVM, DNC',
        experience: '3 Years',
        about: 'Dr. Lee specializes in neurology, providing diagnostic services for neurological conditions and offering treatments for brain and spinal issues in pets.',
        fees: 160,
        address: {
            line1: '19th Cross, Birchwood',
            line2: 'Silver Grove, Houston'
        }
    },
    {
        _id: 'vet12',
        name: 'Dr. Grace Martinez',
        image: vet12,
        speciality: 'Grooming',
        degree: 'DVM, MVO',
        experience: '4 Years',
        about: 'Dr. Martinez offers specialized care for pets with eye conditions, from routine exams to surgeries for cataracts and other vision problems.',
        fees: 110,
        address: {
            line1: '23rd Cross, Windmill',
            line2: 'Elm Street, Dallas'
        }
    },
    {
        _id: 'vet13',
        name: 'Dr. Ella Carter',
        image: vet13,
        speciality: 'Grooming',
        degree: 'DVM, MVO',
        experience: '6 Years',
        about: 'Dr. Carter specializes in treating cancer in pets, offering chemotherapy and other treatment options to extend your pet’s life.',
        fees: 200,
        address: {
            line1: '42nd Cross, Waterway',
            line2: 'Garden Lane, Orlando'
        }
    },
    {
        _id: 'vet14',
        name: 'Dr. Isaac Walker',
        image: vet14,
        speciality: 'Grooming',
        degree: 'DVM',
        experience: '5 Years',
        about: 'Dr. Walker provides care for aging pets, focusing on treatments for arthritis, dental health, and overall comfort as pets age.',
        fees: 120,
        address: {
            line1: '36th Cross, Evergreen',
            line2: 'Pinecrest Ave, Atlanta'
        }
    },
    {
        _id: 'vet15',
        name: 'Dr. Scarlett Young',
        image: vet15,
        speciality: 'Grooming',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Young focuses on preventive care, including vaccinations, parasite control, and wellness exams to keep your pets healthy and happy.',
        fees: 85,
        address: {
            line1: '50th Cross, Redwood Heights',
            line2: 'Maple Ave, Chicago'
        }
    }
];
