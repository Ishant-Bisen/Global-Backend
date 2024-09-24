const zod = require("zod")

const adminSchema = zod.object(
    {
        email : zod.string().email(),
        password : zod.string().min(8)
    }
);

const userSchma = zod.object(
    {
        name : zod.string().min(3),
        email : zod.string().email(),
        password : zod.string().min(8)
    }
)

const BankSchema = zod.object(
    {
        uid:zod.string(),
        account_holder_name: zod.string().min(3),
        account_number: zod.number().min(16),
        bank_name: zod.string().min(3),
        ifsc_code:zod.string().min(3),
        branch:zod.string().min(3),
        mobile_number:zod.string().min(10),
        address: zod.string(),  
    }
)