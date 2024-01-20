import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


mongoose.connect("mongodb://localhost/testdb")
