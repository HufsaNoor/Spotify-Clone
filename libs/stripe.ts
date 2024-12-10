// import Stripe from "stripe";

// export const stripe = new Stripe(
//     process.env.STRIPE_SECREY_KEY,
//     {
//         apiVersion: '2024-10-28.acacia',
//         appInfo: {
//             name: 'Spotify-Clone',
//             version:'0.1.0'
//         },
//     }

// );
import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY as string, // Corrected the typo here
    {
        apiVersion: '2024-10-28.acacia', // Ensure this API version is valid
        appInfo: {
            name: 'Spotify-Clone',
            version: '0.1.0',
        },
    }
);
