type PageProps = {
  params: {
    handle: string;
  };
};

export default function PublicProfilePage({ params }: PageProps) {
  void params;

  return null;
}