/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: digitalproducts
 * @catalog This collection is an eCommerce catalog
 * Interface for DigitalProducts
 */
export interface DigitalProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}
