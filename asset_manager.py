import os
import shutil
import json
import sys

def main():
    # Force UTF-8 encoding for stdout to handle Vietnamese characters
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
        
    workspace = r"c:\Users\Admin\Desktop\LYMS_Ladi_MySinhYen"
    source_dir = os.path.join(workspace, "Source")
    logo_src_path = os.path.join(workspace, "Logo", "LOGO Si.png")
    assets_dir = os.path.join(workspace, "assets")
    images_dir = os.path.join(assets_dir, "images")
    video_dir = os.path.join(assets_dir, "video")

    # Create directories if they don't exist
    os.makedirs(images_dir, exist_ok=True)
    os.makedirs(video_dir, exist_ok=True)

    print("Dang sao chep cac tep tin tu Source vao assets...")
    
    copied_images = []
    video_path = ""

    # Copy the brand logo
    logo_dest_path = os.path.join(images_dir, "logo.png")
    if os.path.exists(logo_src_path):
        shutil.copy2(logo_src_path, logo_dest_path)
        logo_path = "assets/images/logo.png"
        print(f"Copied brand logo: LOGO Si.png -> logo.png")
    else:
        logo_path = ""
        print("Warning: LOGO Si.png not found")

    for file_name in os.listdir(source_dir):
        src_path = os.path.join(source_dir, file_name)
        if not os.path.isfile(src_path):
            continue

        ext = file_name.lower().split('.')[-1]
        
        if ext in ['jpg', 'jpeg', 'png']:
            # Avoid copying the logo from source if it has a long name, or copy it but keep brand logo as primary
            if len(file_name) > 30 and "_" in file_name:
                dest_name = "original_banner.jpg"
                dest_path = os.path.join(images_dir, dest_name)
                shutil.copy2(src_path, dest_path)
                print(f"Copied banner: {file_name} -> {dest_name}")
            else:
                dest_path = os.path.join(images_dir, file_name)
                shutil.copy2(src_path, dest_path)
                copied_images.append(f"assets/images/{file_name}")
                print(f"Copied image: {file_name}")
                
        elif ext == 'mp4':
            dest_name = "product_video.mp4"
            dest_path = os.path.join(video_dir, dest_name)
            shutil.copy2(src_path, dest_path)
            video_path = f"assets/video/{dest_name}"
            # Safe print
            safe_name = file_name.encode('ascii', errors='replace').decode('ascii')
            print(f"Copied video: {safe_name} -> {dest_name}")

    # Sort images to keep them ordered
    copied_images.sort()

    # If brand logo was not found, assign the first image as logo
    if not logo_path and copied_images:
        logo_path = copied_images[0]

    # Create JSON metadata
    metadata = {
        "logo": logo_path,
        "video": video_path,
        "images": copied_images
    }

    metadata_path = os.path.join(assets_dir, "media_list.json")
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=4, ensure_ascii=False)
        
    print(f"\nDa tao file metadata tai: {metadata_path}")
    print("Hoan thanh sao chep va sap xep tai nguyen!")

if __name__ == "__main__":
    main()
