import { TravelRepository } from "../repositories/travelRepository";
import { TouristRepository } from "../repositories/touristRepository";
import { CreateTravelDto, UpdateTravelDto } from "../types";

export class TravelService {
  private travelRepository: TravelRepository;
  private touristRepository: TouristRepository;

  constructor() {
    this.travelRepository = new TravelRepository();
    this.touristRepository = new TouristRepository();
  }

  async createTravel(data: CreateTravelDto) {
    const tourist = await this.touristRepository.findById(data.touristId);
    if (!tourist) {
      throw new Error("Tourist not found");
    }

    if (
      new Date(data.tanggalMulaiPerjalanan) >=
      new Date(data.tanggalBerakhirPerjalanan)
    ) {
      throw new Error("End date must be after start date");
    }

    if (data.tanggalMulaiPerjalanan) {
      data.tanggalMulaiPerjalanan = new Date(data.tanggalMulaiPerjalanan);
    }

    if (data.tanggalBerakhirPerjalanan) {
      data.tanggalBerakhirPerjalanan = new Date(data.tanggalBerakhirPerjalanan);
    }

    return this.travelRepository.create(data);
  }

  async getAllTravels() {
    return this.travelRepository.findAll();
  }

  async getTravelById(id: string) {
    const travel = await this.travelRepository.findById(id);
    if (!travel) {
      throw new Error("Travel not found");
    }
    return travel;
  }

  async getTravelsByTouristId(touristId: string) {
    const tourist = await this.touristRepository.findById(touristId);
    if (!tourist) {
      throw new Error("Tourist not found");
    }
    return this.travelRepository.findByTouristId(touristId);
  }

  async updateTravel(id: string, data: UpdateTravelDto) {
    const travel = await this.travelRepository.findById(id);
    if (!travel) {
      throw new Error("Travel not found");
    }

    if (data.tanggalMulaiPerjalanan && data.tanggalBerakhirPerjalanan) {
      if (
        new Date(data.tanggalMulaiPerjalanan) >=
        new Date(data.tanggalBerakhirPerjalanan)
      ) {
        throw new Error("End date must be after start date");
      }
    }

    if (data.tanggalMulaiPerjalanan) {
      data.tanggalMulaiPerjalanan = new Date(data.tanggalMulaiPerjalanan);
    }

    if (data.tanggalBerakhirPerjalanan) {
      data.tanggalBerakhirPerjalanan = new Date(data.tanggalBerakhirPerjalanan);
    }

    return this.travelRepository.update(id, data);
  }

  async deleteTravel(id: string) {
    const travel = await this.travelRepository.findById(id);
    if (!travel) {
      throw new Error("Travel not found");
    }

    return this.travelRepository.delete(id);
  }
}
