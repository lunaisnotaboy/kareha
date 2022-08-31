# frozen_string_literal: true

require 'image_processing/vips'

class AvatarUploader < ImageUploader
  Attacher.derivatives do |original|
    vips = ImageProcessing::Vips.source(original)

    {
      extra_small: vips.resize_to_limit!(128, 128),
      small: vips.resize_to_limit!(256, 256),
      medium: vips.resize_to_limit!(512, 512),
      large: vips.resize_to_limit!(1024, 1024)
    }
  end
end
