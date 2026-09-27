import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteMeta {
  title: string;
  description: string;
}

const defaultMeta: RouteMeta = {
  title: 'PDF Karo - Private PDF Tools',
  description: 'Private PDF tools that run in your browser. Merge, split, convert, edit, secure, and optimize PDFs locally.',
};

const routeMeta: Record<string, RouteMeta> = {
  '/': defaultMeta,
  '/view': {
    title: 'View PDF Online | PDF Karo',
    description: 'Open and view PDFs privately in PDF Karo, then send the current file into editing, signing, compression, and other tools.',
  },
  '/compress': {
    title: 'Compress PDF - Reduce File Size Online | PDF Karo',
    description: 'Reduce PDF size with browser-based compression and readability preview controls. Private and client-side.',
  },
  '/merge': {
    title: 'Merge PDF Files Online - Free & Private | PDF Karo',
    description: 'Combine multiple PDFs into one document instantly with local processing. No upload required.',
  },
  '/split': {
    title: 'Split PDF Pages - Extract & Separate Online | PDF Karo',
    description: 'Split PDFs by selected pages, all pages, or by custom page groups, fully in-browser.',
  },
  '/edit': {
    title: 'Edit PDF - Fill Form Fields and Add Text | PDF Karo',
    description: 'Fill detected PDF form fields or place text overlays on a page, then save the updated document privately on your device.',
  },
  '/pdf-to-jpg': {
    title: 'PDF to JPG Converter - Export Pages to Images | PDF Karo',
    description: 'Convert PDF pages to JPG, PNG, or WebP images with live quality and DPI controls.',
  },
  '/pdf-to-word': {
    title: 'PDF to Word - Export PDF Text to DOCX | PDF Karo',
    description: 'Convert the searchable text layer of a PDF into a .docx file in your browser. No upload, no account.',
  },
  '/word-to-pdf': {
    title: 'Word to PDF - Convert DOCX Locally | PDF Karo',
    description: 'Convert text from .docx Word files into PDF pages entirely in your browser. No upload or account.',
  },
  '/powerpoint-to-pdf': {
    title: 'PowerPoint to PDF - Convert PPTX Locally | PDF Karo',
    description: 'Render .pptx slides to PDF at their native aspect ratio with local browser processing.',
  },
  '/make-fillable': {
    title: 'Make PDF Fillable - Form Field Detection | PDF Karo',
    description: 'Suggest, draw, review, and export real fillable PDF fields locally in your browser.',
  },
  '/image-to-pdf': {
    title: 'JPG to PDF Converter - Create PDFs from Images | PDF Karo',
    description: 'Create PDFs from images with drag-and-drop layout controls and local export.',
  },
  '/make-pdf': {
    title: 'Create PDF from Photos - Camera or Gallery | PDF Karo',
    description: 'Capture or import photos and build a scanned PDF directly in your browser.',
  },
  '/sign': {
    title: 'Sign PDF - Add Signature Image | PDF Karo',
    description: 'Draw or upload your signature, place it on pages, and export a signed PDF locally.',
  },
  '/delete-pages': {
    title: 'Delete PDF Pages - Remove Unwanted Pages | PDF Karo',
    description: 'Select and remove PDF pages visually with thumbnail previews and instant export.',
  },
  '/reorder': {
    title: 'Reorder PDF Pages - Drag and Drop Sort | PDF Karo',
    description: 'Rearrange PDF pages with drag-and-drop ordering and page-level previews.',
  },
  '/rotate': {
    title: 'Rotate PDF Pages - Batch Page Rotation | PDF Karo',
    description: 'Rotate selected or all PDF pages by 90-degree increments and download the updated file.',
  },
  '/protect': {
    title: 'Protect PDF with Password | PDF Karo',
    description: 'Encrypt PDF documents with a password locally and keep your files private.',
  },
  '/unlock': {
    title: 'Unlock PDF - Remove Password | PDF Karo',
    description: 'Decrypt password-protected PDFs locally after entering the correct password.',
  },
  '/extract': {
    title: 'Extract PDF Pages - Export Selected Pages | PDF Karo',
    description: 'Choose exact pages and export them into a new PDF file with local-only processing.',
  },
  '/metadata': {
    title: 'PDF Metadata Editor - Title, Author, Keywords | PDF Karo',
    description: 'View and update PDF metadata fields like title, author, subject, and keywords.',
  },
  '/flatten': {
    title: 'Flatten PDF Forms - Lock Form Fields | PDF Karo',
    description: 'Flatten form fields into static content to make documents non-editable.',
  },
  '/compare': {
    title: 'Compare PDF Files - Multi-page Comparison Report | PDF Karo',
    description: 'Compare two PDFs page by page and export a detailed text comparison report.',
  },
  '/ocr': {
    title: 'OCR PDF - Extract Text Layer or Run OCR | PDF Karo',
    description: 'Extract text from PDF text layers or run OCR on image-based pages directly in-browser.',
  },
  '/watermark': {
    title: 'Watermark PDF - Add Custom Text Watermark | PDF Karo',
    description: 'Apply text watermarks with custom size, opacity, color, and rotation.',
  },
  '/page-numbers': {
    title: 'Add Page Numbers to PDF | PDF Karo',
    description: 'Add custom page numbering with flexible format, position, and page range controls.',
  },
  '/repair': {
    title: 'Repair PDF - Re-save for Compatibility | PDF Karo',
    description: 'Rebuild and re-save PDFs to improve compatibility with strict PDF readers.',
  },
  '/crop': {
    title: 'Crop PDF - Trim Page Margins | PDF Karo',
    description: 'Crop PDF page margins privately in your browser by applying a new crop box.',
  },
  '/header-footer': {
    title: 'Add Header and Footer to PDF | PDF Karo',
    description: 'Add repeated header and footer text with page numbering tokens directly in your browser.',
  },
  '/remove-metadata': {
    title: 'Remove PDF Metadata | PDF Karo',
    description: 'Strip title, author, dates, viewer preferences, and hidden metadata from PDFs locally.',
  },
  '/remove-annotations': {
    title: 'Remove PDF Annotations | PDF Karo',
    description: 'Remove comments, annotations, markup, and page-level actions from PDF files without uploading.',
  },
  '/remove-blank-pages': {
    title: 'Remove Blank Pages from PDF | PDF Karo',
    description: 'Detect mostly empty PDF pages and export a cleaned copy with local processing.',
  },
  '/extract-images': {
    title: 'Extract Images from PDF | PDF Karo',
    description: 'Find embedded images in PDF files and download them as PNG files in a ZIP archive.',
  },
  '/sanitize': {
    title: 'Sanitize PDF - Clean Hidden Data | PDF Karo',
    description: 'Clean metadata and annotations from PDFs in one privacy-focused browser pass.',
  },
  '/batch': {
    title: 'Batch PDF Processing - Private Bulk Tools | PDF Karo',
    description: 'Run compression, conversion, security, metadata, page, and repair operations across several PDFs locally.',
  },
  '/recent': {
    title: 'Local Output History | PDF Karo',
    description: 'Re-download and manage PDF Karo outputs stored only in this browser.',
  },
  '/history': {
    title: 'Local Output History | PDF Karo',
    description: 'Re-download and manage PDF Karo outputs stored only in this browser.',
  },
  '/settings': {
    title: 'Settings | PDF Karo',
    description: 'Control local history, download behavior, and large-file safety preferences for PDF Karo.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | PDF Karo',
    description: 'Read the PDF Karo privacy policy.',
  },
  '/privacy': {
    title: 'Privacy Policy | PDF Karo',
    description: 'Read the PDF Karo privacy policy for the Android app and web app.',
  },
  '/pdf-chef-privacy': {
    title: 'Android Privacy Policy | PDF Karo',
    description: 'Read the Android app privacy policy for PDF Karo.',
  },
  '/terms': {
    title: 'Terms and Conditions | PDF Karo',
    description: 'Read the PDF Karo terms and conditions.',
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | PDF Karo',
    description: 'Read the PDF Karo terms and conditions.',
  },
};

const upsertMetaTag = (name: string, content: string, property = false) => {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    if (property) element.setAttribute('property', name);
    else element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

export const RouteSEO: React.FC = () => {
  const location = useLocation();

  const normalizedPath = useMemo(() => {
    if (location.pathname === '/') return '/';
    return location.pathname.replace(/\/+$/, '');
  }, [location.pathname]);

  const meta = useMemo(() => {
    return routeMeta[normalizedPath] ?? defaultMeta;
  }, [normalizedPath]);

  useEffect(() => {
    const origin = typeof window !== 'undefined'
      ? window.location.origin
      : 'https://pdfchef.dhananjaytech.app';
    const canonicalPath = normalizedPath === '/' ? '/' : normalizedPath;
    const canonicalUrl = `${origin}${canonicalPath}`;

    document.title = meta.title;

    upsertMetaTag('description', meta.description);
    upsertMetaTag('og:title', meta.title, true);
    upsertMetaTag('og:description', meta.description, true);
    upsertMetaTag('og:url', canonicalUrl, true);
    upsertMetaTag('twitter:title', meta.title, true);
    upsertMetaTag('twitter:description', meta.description, true);
    upsertMetaTag('twitter:url', canonicalUrl, true);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);
  }, [normalizedPath, meta]);

  return null;
};
