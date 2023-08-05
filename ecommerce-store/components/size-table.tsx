import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SizeTable = () => {
  return (
    <section>
      <Table>
        <TableCaption>Women size chart</TableCaption>
        <TableHeader className="col-auto">
          <TableRow>
            <TableHead className="font-bold">EU</TableHead>
            <TableHead className="font-bold">XS (36)</TableHead>
            <TableHead className="font-bold">S (38)</TableHead>
            <TableHead className="font-bold">M (40)</TableHead>
            <TableHead className="font-bold">L (42)</TableHead>
            <TableHead className="">XL (44)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="col-auto">
          <TableRow>
            <TableCell className="font-medium">Chest (cm)</TableCell>
            <TableCell>81 - 85</TableCell>
            <TableCell>85 - 89</TableCell>
            <TableCell>89 - 94</TableCell>
            <TableCell>89 - 94</TableCell>
            <TableCell>94 - 104</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Waist (cm)</TableCell>
            <TableCell>63 - 68</TableCell>
            <TableCell>68 - 73</TableCell>
            <TableCell>73 - 78</TableCell>
            <TableCell>78 - 83</TableCell>
            <TableCell>83 - 88</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Hips (cm)</TableCell>
            <TableCell>84 - 89</TableCell>
            <TableCell>89 - 94</TableCell>
            <TableCell>94 - 98</TableCell>
            <TableCell>98 - 103</TableCell>
            <TableCell>103 - 109</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Inseam (cm)</TableCell>
            <TableCell>73 - 76</TableCell>
            <TableCell>75 - 78</TableCell>
            <TableCell>78 - 81</TableCell>
            <TableCell>80 - 83</TableCell>
            <TableCell>82 - 83</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default SizeTable;
