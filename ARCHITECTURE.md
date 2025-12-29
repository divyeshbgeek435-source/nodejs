# Backend Architecture - Separate Collections

## 📋 Overview

This backend uses **4 separate MongoDB collections** with proper references:
- **Merchant** - Main merchant/store information
- **FormTemplate** - Form templates (separate collection)
- **Contact** - Form submissions/contacts (separate collection)
- **StoreLog** - Activity logs (separate collection)

## 🗂️ Collection Structure

### 1. **Merchant Collection**
```javascript
{
  merchantId: "gid://shopify/Shop/123456",  // Formatted automatically
  storeName: "My Store",
  // ... Shopify store details
  formTemplates: [ObjectId, ObjectId],  // References to FormTemplate
  contacts: [ObjectId, ObjectId],       // References to Contact
  logs: [ObjectId, ObjectId]            // References to StoreLog
}
```

### 2. **FormTemplate Collection**
```javascript
{
  merchantId: "gid://shopify/Shop/123456",  // Links to Merchant
  name: "Contact Form",
  fields: [...],
  // ... form configuration
}
```

### 3. **Contact Collection**
```javascript
{
  merchantId: "gid://shopify/Shop/123456",  // Links to Merchant
  text: {...},
  email: {...},
  // ... form submission data
}
```

### 4. **StoreLog Collection**
```javascript
{
  merchantId: "gid://shopify/Shop/123456",  // Links to Merchant
  event: "form_submitted",
  ipAddress: "...",
  userAgent: "...",
  details: "..."
}
```

## 🔄 Data Flow

### When Form Template is Created:
1. **FormTemplate** document created with `merchantId`
2. **FormTemplate._id** added to **Merchant.formTemplates** array
3. **StoreLog** entry created with event "form_saved"
4. **StoreLog._id** added to **Merchant.logs** array

### When Contact/Form is Submitted:
1. **Contact** document created with `merchantId`
2. **Contact._id** added to **Merchant.contacts** array
3. **StoreLog** entry created with event "form_submitted"
4. **StoreLog._id** added to **Merchant.logs** array

### When Any Action Happens:
- **StoreLog** entry is ALWAYS created
- **StoreLog._id** is ALWAYS added to **Merchant.logs** array

## 🔧 MerchantId Formatting

**Automatic Formatting**: Any number provided is automatically converted to `gid://shopify/Shop/${number}`

**Examples:**
- Input: `123456` → Output: `gid://shopify/Shop/123456`
- Input: `gid://shopify/Shop/123456` → Output: `gid://shopify/Shop/123456` (unchanged)
- Input: `"123456"` → Output: `gid://shopify/Shop/123456`

**Location**: `utils/merchantIdHelper.js`

## 📝 Logged Events

All these actions create StoreLog entries:

| Event | Description |
|-------|-------------|
| `install` | App installed |
| `update` | Merchant updated |
| `form_saved` | Form template created/updated |
| `form_updated` | Form template updated |
| `form_deleted` | Form template deleted |
| `field_saved` | Field added to form |
| `field_updated` | Field updated |
| `field_deleted` | Field deleted |
| `fields_reordered` | Fields reordered |
| `form_submitted` | Contact form submitted |

## 🛣️ API Routes

### Merchant Routes (`/merchant`)
- `POST /merchant/create` - Create merchant
- `PUT /merchant/update/:id` - Update merchant
- `GET /merchant/users/:merchantId` - Get merchant with all data
- `GET /merchant/all` - Get all merchants

### Form Routes (`/form`)
- `POST /form/:merchantId` - Save form template
- `GET /form/:merchantId` - Get form template
- `PUT /form/:merchantId` - Update form template
- `DELETE /form/:merchantId` - Delete form template
- `POST /form/:merchantId/field` - Add field
- `PUT /form/:merchantId/field/:fieldId` - Update field
- `DELETE /form/:merchantId/field/:fieldId` - Delete field
- `PUT /form/:merchantId/fields/reorder` - Reorder fields

### Contact Routes (`/contact`)
- `POST /contact/add-user` - Submit form (create contact)
- `GET /contact/pipeline/:merchantId` - Get contacts analytics
- `POST /contact/webhooks/order-create` - Shopify webhook

## ✅ Verification Checklist

- [x] 4 separate collections (Merchant, FormTemplate, Contact, StoreLog)
- [x] FormTemplate stores merchantId
- [x] Merchant stores formId in formTemplates array
- [x] Contact stores merchantId
- [x] Merchant stores contactId in contacts array
- [x] StoreLog stores merchantId
- [x] Merchant stores logId in logs array
- [x] merchantId auto-formats to `gid://shopify/Shop/${number}`
- [x] All actions logged in StoreLog
- [x] All logs linked to Merchant

## 📁 File Structure

```
backend/
├── models/
│   ├── Merchant.js          # Merchant collection
│   ├── FormTemplate.js      # FormTemplate collection
│   ├── Contact.js           # Contact collection
│   └── StoreLog.js          # StoreLog collection
├── controllers/
│   └── userController.js    # All controllers
├── routes/
│   ├── merchantRoutes.js    # Merchant routes
│   ├── formRoutes.js        # Form routes
│   ├── contactRoutes.js     # Contact routes
│   └── index.js             # Route aggregator
└── utils/
    └── merchantIdHelper.js  # MerchantId formatter
```

