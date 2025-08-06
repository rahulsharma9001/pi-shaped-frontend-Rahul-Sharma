import { NextResponse } from 'next/server';

// Sample fruits data
const fruits = [
  { id: 1, name: 'Apple', color: 'Red', taste: 'Sweet' },
  { id: 2, name: 'Banana', color: 'Yellow', taste: 'Sweet' },
  { id: 3, name: 'Orange', color: 'Orange', taste: 'Citrusy' },
  { id: 4, name: 'Grape', color: 'Purple', taste: 'Sweet' },
  { id: 5, name: 'Lemon', color: 'Yellow', taste: 'Sour' },
  { id: 6, name: 'Strawberry', color: 'Red', taste: 'Sweet' },
  { id: 7, name: 'Blueberry', color: 'Blue', taste: 'Sweet' },
  { id: 8, name: 'Watermelon', color: 'Green', taste: 'Sweet' },
  { id: 9, name: 'Pineapple', color: 'Yellow', taste: 'Sweet & Tangy' },
  { id: 10, name: 'Mango', color: 'Orange', taste: 'Sweet' },
];

export async function GET() {
  try {
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      data: fruits,
      timestamp: new Date().toISOString(),
      message: 'Fruits data retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch fruits data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

