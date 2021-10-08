import dotenv from 'dotenv';
/* istanbul ignore next */
if (process.env.NODE_ENV === 'PRD') 
    dotenv.config({ path: '.env' });
/* istanbul ignore next */
else if (process.env.NODE_ENV === 'QA') 
    dotenv.config({ path: '.env.qa' })
else
    dotenv.config({ path: '.env.dev' });
export default dotenv;