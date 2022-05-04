export interface LaunchBasic {
  id: string;
  mission_name: string;
  links: {
    video_link: string;
  };
}

export interface LaunchDetails extends LaunchBasic {
  launch_success: boolean;
  launch_year: string;
  rocket: {
    rocket_name: string;
  };
}
